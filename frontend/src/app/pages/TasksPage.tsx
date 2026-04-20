// src/app/pages/TasksPage.tsx
import {MaintenanceTaskCard} from '@/features/maintenance-tasks/components/MaintenanceTaskCard';
import {useMaintenanceTasks} from '@/features/maintenance-tasks/hooks/useMaintenanceTasks';
import {TaskFormDialog} from '@/features/maintenance-tasks/components/TaskFormDialog';
import {useTaskFormStore} from '@/store/useTaskFormStore';
import type {MaintenanceTask} from "@/core/types/MaintenanceTask";

export const TasksPage = () => {
    const {tasks: tasks} = useMaintenanceTasks();
    const {isOpen} = useTaskFormStore();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Задачи по обслуживанию</h1>
                <button
                    onClick={() => useTaskFormStore.getState().openForm('task-new')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    + Добавить задачу
                </button>
            </div>

            {tasks && tasks.length > 0 ? (
                <div className="space-y-4">
                    {tasks.map((task: MaintenanceTask) => (
                        <MaintenanceTaskCard key={task.id} task={task} onEdit={() => {
                            useTaskFormStore.getState().openForm(task.id);
                        }}/>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Нет задач</p>
            )}

            {isOpen && <TaskFormDialog/>}
        </div>
    );
};