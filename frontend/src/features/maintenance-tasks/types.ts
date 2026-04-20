import type { MaintenanceTask } from '@/core/types/MaintenanceTask';

export interface MaintenanceTaskCardProps {
    task: MaintenanceTask;
    onEdit: () => void;
}