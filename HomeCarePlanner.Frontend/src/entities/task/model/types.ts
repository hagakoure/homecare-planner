export interface MaintenanceTask {
    id: string;
    title: string;
    description: string | null;
    lastReplacement: string | null;
    intervalDays: number;
    category?: { id: string; name: string };
}