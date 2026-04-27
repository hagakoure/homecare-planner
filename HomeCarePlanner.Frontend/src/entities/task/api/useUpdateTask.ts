import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/entities/task/model/types';

export const useUpdateTask = () => {
    const qc = useQueryClient();
    return useMutation<MaintenanceTask, Error, MaintenanceTask>({
        mutationFn: (task) => fetch(`http://localhost:5282/api/tasks/${task.id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task)
        }).then(r => r.json()),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });
};