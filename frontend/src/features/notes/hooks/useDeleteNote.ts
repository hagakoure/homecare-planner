import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) =>
            fetch(`http://localhost:5282/api/notes/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};