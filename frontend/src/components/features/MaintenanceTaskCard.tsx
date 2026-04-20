import type {MaintenanceTaskCardProps} from "@/features/maintenance-tasks/types.ts";


export const MaintenanceTaskCard = ({ task, onEdit }: MaintenanceTaskCardProps) => {
    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
            {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
            <div className="mt-2 text-sm text-gray-500">
                Категория: {task.category}
            </div>
            <div className="mt-2 text-sm">
                Интервал: каждые {task.intervalDays} дней
            </div>
            <button
                onClick={onEdit}
                className="mt-3 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            >
                Редактировать
            </button>
        </div>
    );
};