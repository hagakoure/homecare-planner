import {useMemo} from 'react';
import type {MaintenanceTaskCardProps} from "@/features/maintenance-tasks/types.ts";
import {getTaskStatus} from "@/shared/lib/getTaskStatus";
import {useDeleteMaintenanceTask} from "@/entities/task/api/useDeleteMaintenanceTask";

export const MaintenanceTaskCard = ({task, onEdit}: MaintenanceTaskCardProps) => {
    const nextDue = useMemo(() => {
        if (!task.lastReplacement) return null;
        const date = new Date(task.lastReplacement);
        date.setDate(date.getDate() + task.intervalDays);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }, [task.lastReplacement, task.intervalDays]);

    const deleteMutation = useDeleteMaintenanceTask();
    const handleDelete = () => {
        if (confirm(`Удалить задачу "${task.title}"?`)) {
            deleteMutation.mutate(task.id);
        }
    };

    const status = nextDue ? getTaskStatus(nextDue) : 'normal';

    const getCardClass = () => {
        switch (status) {
            case 'overdue':
                return 'border-l-4 border-red-500 bg-red-50';
            case 'upcoming':
                return 'border-l-4 border-yellow-500 bg-yellow-50';
            default:
                return 'border-l-4 border-gray-300 bg-white';
        }
    };

    return (
        <div className={`p-4 rounded-r-lg shadow-sm ${getCardClass()}`}>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                {status === 'overdue' && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Просрочено</span>
                )}
                {status === 'upcoming' && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Скоро</span>
                )}
            </div>

            {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}

            <div className="mt-2 text-sm text-gray-500">
                Категория: {task.category}
            </div>

            {nextDue && (
                <div className="mt-2 text-sm">
                    Следующая замена: <time dateTime={nextDue}>{new Date(nextDue).toLocaleDateString()}</time>
                </div>
            )}

            <button
                onClick={onEdit}
                className="mt-3 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            >
                Редактировать
            </button>

            <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-sm"
            >
                🗑️ Удалить
            </button>
        </div>
    );
};