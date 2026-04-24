import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/core/types/MaintenanceTask';

export const useUpdateMaintenanceTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedTask }: { id: string; updatedTask: MaintenanceTask }) => {
            const res = await fetch(`http://localhost:5282/api/maintenancetasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
            if (!res.ok) throw new Error('Failed to update task');
            const data = await res.json();
            return data as MaintenanceTask;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenanceTasks'] });
        },
    });
};