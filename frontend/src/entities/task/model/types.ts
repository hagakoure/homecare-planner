export interface MaintenanceTask {
    id: string;
    title: string;
    description: string | null;
    lastReplacement: string | null;
    intervalDays: number;
    category: 'water-filter' | 'air-filter' | 'garden' | 'other';
}