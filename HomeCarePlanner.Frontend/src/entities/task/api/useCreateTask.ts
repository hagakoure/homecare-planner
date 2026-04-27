import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/entities/task/model/types';

export const useCreateTask = () => {
    const qc = useQueryClient();
    return useMutation<MaintenanceTask, Error, Omit<MaintenanceTask, 'id' | 'createdAt' | 'isDue' | 'daysUntilDue'>>({
        mutationFn: (task) => fetch('http://localhost:5282/api/tasks', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task)
        }).then(r => r.json()),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });
};