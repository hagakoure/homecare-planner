import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/entities/task/model/types';

interface DeleteTaskContext {
    previousTasks?: MaintenanceTask[] | undefined;
}

export const useDeleteMaintenanceTask = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string, DeleteTaskContext>({
        mutationFn: async (id: string): Promise<void> => {
            const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                throw new Error(`Failed to delete task: ${res.status}`);
            }
        },
        onMutate: async (deletedId: string) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<MaintenanceTask[]>(['tasks']);

            queryClient.setQueryData<MaintenanceTask[]>(['tasks'], (old) => {
                if (!old) return [];
                return old.filter((task) => task.id !== deletedId);
            });

            return { previousTasks };
        },
        onError: (_err: Error, _deletedId: string, context?: DeleteTaskContext) => {
            if (context?.previousTasks) {
                queryClient.setQueryData<MaintenanceTask[]>(['tasks'], context.previousTasks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};