import { useState } from 'react';
import { useTasks } from '@/entities/task/api/useTasks';
import { useCreateTask } from '@/entities/task/api/useCreateTask';
import { useDeleteTask } from '@/entities/task/api/useDeleteTask';
import { TaskFormDialog } from '@/features/task/ui/TaskFormDialog';
import type { MaintenanceTask } from '@/entities/task/model/types';

export function TasksPage() {
    const {  tasks, isLoading } = useTasks();
    const createMutation = useCreateTask();
    const deleteMutation = useDeleteTask();
    const [isFormOpen, setFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<MaintenanceTask | undefined>();

    const handleCreate = (data: any) => {
        createMutation.mutate(data, { onSuccess: () => setFormOpen(false) });
    };

    const handleDelete = (id: string) => {
        if (confirm('Удалить задачу?')) deleteMutation.mutate(id);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Задачи обслуживания</h1>
                <button onClick={() => { setEditingTask(undefined); setFormOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Добавить задачу
                </button>
            </div>

            {isLoading ? <p>Загрузка...</p> : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks?.map(task => (
                        <div key={task.id} className={`p-4 border rounded-lg transition-all ${task.isDue ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                {task.isDue && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">СРОЧНО</span>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{task.description || 'Без описания'}</p>
                            <div className="mt-3 flex justify-between items-center text-sm">
                                <span>Категория: {task.category}</span>
                                <span>Осталось: {task.daysUntilDue} дн.</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => { setEditingTask(task); setFormOpen(true); }} className="flex-1 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">Редактировать</button>
                                <button onClick={() => handleDelete(task.id)} className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <TaskFormDialog
                task={editingTask}
                isOpen={isFormOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleCreate}
                isLoading={createMutation.isPending}
            />
        </div>
    );
}