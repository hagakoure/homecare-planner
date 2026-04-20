// src/features/maintenance-tasks/hooks/useMaintenanceTasks.ts
import { useQuery } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/core/types/MaintenanceTask';
import type { RawMaintenanceTask } from '../types/RawMaintenanceTask';

export const useMaintenanceTasks = () => {
    return useQuery<MaintenanceTask[]>({
        queryKey: ['maintenanceTasks'],
        queryFn: async (): Promise<MaintenanceTask[]> => {
            const res = await fetch('http://localhost:5282/api/maintenancetasks');
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const rawData = await res.json() as RawMaintenanceTask[]; // ✅ типизировано

            return rawData.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description ?? null,
                lastReplacement: task.lastReplacement ?? null,
                intervalDays: task.intervalDays,
                category: task.category as 'water-filter' | 'air-filter' | 'garden' | 'other',
            }));
        },
        staleTime: 30_000,
    });
};