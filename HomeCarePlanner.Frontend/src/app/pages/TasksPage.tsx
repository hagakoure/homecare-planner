import { MaintenanceTaskCard } from '@/entities/task/ui/MaintenanceTaskCard';
import { useMaintenanceTasks } from '@/entities/task/api/useMaintenanceTasks';
import { TaskFormDialog } from '@/features/maintenance-tasks/components/TaskFormDialog';
import { useTaskFormStore } from '@/shared/lib/stores/useTaskFormStore';



export const TasksPage = () => {
    const {  data } = useMaintenanceTasks();
    const isOpen = useTaskFormStore((state) => state.isOpen);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Задачи по обслуживанию</h1>
                <button
                    onClick={() => useTaskFormStore.getState().openForm('task-new')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Добавить задачу
                </button>
            </div>

            {data && data.length > 0 ? (
                <div className="space-y-4">
                    {data.map((task) => (
                        <MaintenanceTaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => useTaskFormStore.getState().openForm(task.id)}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Нет задач</p>
            )}

            {isOpen && <TaskFormDialog />}
        </div>
    );
};
