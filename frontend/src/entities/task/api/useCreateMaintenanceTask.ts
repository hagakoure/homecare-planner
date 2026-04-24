import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/core/types/MaintenanceTask';

type NewMaintenanceTask = Omit<MaintenanceTask, 'id'>;

export const useCreateMaintenanceTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTask: NewMaintenanceTask) => {
            // Генерируем ID на фронтенде (или убери, если бэкенд генерирует)
            const taskToCreate = {
                ...newTask,
                id: crypto.randomUUID(),
            };

            const res = await fetch('http://localhost:5282/api/maintenancetasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskToCreate),
            });

            if (!res.ok) throw new Error('Failed to create task');

            // ✅ Безопасное приведение через unknown
            const data = await res.json();
            return data as MaintenanceTask;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenanceTasks'] });
        },
    });
};