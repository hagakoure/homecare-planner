import { useQuery } from '@tanstack/react-query';
import type { MaintenanceTask } from '@/entities/task/model/types';

export const useTasks = () =>
    useQuery<MaintenanceTask[]>({
        queryKey: ['tasks'],
        queryFn: () => fetch('http://localhost:5282/api/tasks').then(r => r.json()),
        staleTime: 1000 * 60 * 5,
    });