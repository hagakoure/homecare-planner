import { useQuery } from '@tanstack/react-query';

export interface UrgentTask {
    id: string;
    title: string;
    intervalDays: number;
    lastReplacement: string | null;
    nextReplacement: string;
    daysLeft: number;
}

export const useUrgentTasks = () => {
    return useQuery<UrgentTask[]>({
        queryKey: ['notifications', 'urgent-tasks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5282/api/notifications');
            if (!res.ok) throw new Error('Failed to fetch notifications');
            return res.json();
        },
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: true,
    });
};