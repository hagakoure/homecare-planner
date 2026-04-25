import {useState} from 'react';
import { useCreateMaintenanceTask } from "@/entities/task/api/useCreateMaintenanceTask";
import { useUpdateMaintenanceTask } from "@/entities/task/api/useUpdateMaintenanceTask";
import { useMaintenanceTasks } from "@/entities/task/api/useMaintenanceTasks";
import { useTaskFormStore } from "@/shared/lib/stores/useTaskFormStore";

type TaskCategory = 'water-filter' | 'air-filter' | 'garden' | 'other';

export const TaskFormDialog = () => {
    const {closeForm, taskId} = useTaskFormStore();
    const createMutation = useCreateMaintenanceTask();
    const updateMutation = useUpdateMaintenanceTask();
    const {data} = useMaintenanceTasks();

    const isEditing = !!taskId && !taskId.startsWith('task-new');

    // === Инициализация состояния во время рендера ===
    const [title, setTitle] = useState(() => {
        if (isEditing && data && taskId) {
            const task = data.find(t => t.id === taskId);
            return task ? task.title : '';
        }
        return '';
    });

    const [description, setDescription] = useState<string | undefined>(() => {
        if (isEditing && data && taskId) {
            const task = data.find(t => t.id === taskId);
            return task ? task.description ?? undefined : undefined;
        }
        return undefined;
    });

    const [lastReplacement] = useState<string | null>(() => {
        if (isEditing && data && taskId) {
            const task = data.find(t => t.id === taskId);
            return task ? task.lastReplacement : null;
        }
        return null;
    });

    const [intervalDays, setIntervalDays] = useState(() => {
        if (isEditing && data && taskId) {
            const task = data.find(t => t.id === taskId);
            return task ? task.intervalDays : 30;
        }
        return 30;
    });

    const [category, setCategory] = useState<TaskCategory>(() => {
        if (isEditing && data && taskId) {
            const task = data.find(t => t.id === taskId);
            return task ? (task.category as TaskCategory) : 'water-filter';
        }
        return 'water-filter';
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        const taskToSave = {
            id: isEditing ? taskId! : crypto.randomUUID(),
            title,
            description: description || null,
            lastReplacement,
            intervalDays,
            category,
        };

        if (isEditing) {
            updateMutation.mutate({id: taskId!, updatedTask: taskToSave});
        } else {
            createMutation.mutate(taskToSave);
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    {isEditing ? 'Редактировать задачу' : 'Добавить задачу'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Название */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Название *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Описание */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Описание
                        </label>
                        <textarea
                            value={description ?? ''}
                            onChange={(e) => setDescription(e.target.value || undefined)}
                            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            rows={2}
                        />
                    </div>

                    {/* Интервал */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Интервал (дней)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={intervalDays}
                            onChange={(e) => setIntervalDays(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>

                    {/* Категория */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Категория
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as TaskCategory)}
                            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        >
                            <option value="water-filter">Фильтр воды</option>
                            <option value="air-filter">Фильтр воздуха</option>
                            <option value="garden">Сад/огород</option>
                            <option value="other">Другое</option>
                        </select>
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-2 pt-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
                        >
                            {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
                        </button>
                        <button
                            type="button"
                            onClick={closeForm}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};