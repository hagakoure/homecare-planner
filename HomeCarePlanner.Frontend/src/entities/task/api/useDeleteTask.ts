import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTask = () => {
    const qc = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: (id) => fetch(`http://localhost:5282/api/tasks/${id}`, { method: 'DELETE' }),
        onMutate: async (deletedId) => {
            await qc.cancelQueries({ queryKey: ['tasks'] });
            const prev = qc.getQueryData(['tasks']);
            qc.setQueryData(['tasks'], (old: any[] = []) => old.filter(t => t.id !== deletedId));
            return { prev };
        },
        onError: (_err, _id, ctx) => qc.setQueryData(['tasks'], (ctx as any)?.prev),
        onSettled: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });
};