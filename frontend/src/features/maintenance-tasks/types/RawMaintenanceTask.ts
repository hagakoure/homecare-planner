export interface RawMaintenanceTask {
    id: string;
    title: string;
    description: string | null | undefined;
    lastReplacement: string | null | undefined;
    intervalDays: number;
    category: string; 
}