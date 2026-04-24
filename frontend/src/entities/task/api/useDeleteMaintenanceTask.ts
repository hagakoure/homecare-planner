import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMaintenanceTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`http://localhost:5282/api/maintenancetasks/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete task');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenanceTasks'] });
        },
    });
};