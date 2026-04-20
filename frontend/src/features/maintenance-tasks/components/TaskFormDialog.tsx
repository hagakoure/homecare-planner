import {useMemo, useState} from 'react';
import {useCreateMaintenanceTask} from '../hooks/useCreateMaintenanceTask';
import {useUpdateMaintenanceTask} from '../hooks/useUpdateMaintenanceTask';
import {useTaskFormStore} from '@/store/useTaskFormStore';
import {useMaintenanceTasks} from '../hooks/useMaintenanceTasks'; // ✅ импорт хука

type TaskCategory = 'water-filter' | 'air-filter' | 'garden' | 'other';

interface FormData {
    title: string;
    description: string | undefined;
    lastReplacement: string | null;
    intervalDays: number;
    category: TaskCategory;
}

const DEFAULT_FORM_DATA: FormData = {
    title: '',
    description: undefined,
    lastReplacement: null,
    intervalDays: 30,
    category: 'water-filter',
};

export const TaskFormDialog = () => {
    const {closeForm, taskId} = useTaskFormStore(); // ✅ используем closeForm
    const createMutation = useCreateMaintenanceTask();
    const updateMutation = useUpdateMaintenanceTask();
    const {data: tasks} = useMaintenanceTasks(); // ✅ правильно: data → tasks

    const isEditing = taskId && !taskId.startsWith('task-new');

    const initialData = useMemo(() => {
        if (!isEditing || !tasks || !taskId) return DEFAULT_FORM_DATA;
        const task = tasks.find(t => t.id === taskId);
        return task
            ? {
                title: task.title,
                description: task.description ?? undefined,
                lastReplacement: task.lastReplacement,
                intervalDays: task.intervalDays,
                category: task.category as TaskCategory,
            }
            : DEFAULT_FORM_DATA;
    }, [isEditing, tasks, taskId]);

    const [formData, setFormData] = useState<FormData>(initialData);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const taskToSave = {
            id: isEditing ? taskId! : crypto.randomUUID(),
            ...formData,
            description: formData.description || null,
        };

        if (isEditing) {
            updateMutation.mutate({id: taskId!, updatedTask: taskToSave});
        } else {
            createMutation.mutate(taskToSave);
        }
    };

    // ✅ Обязательно используем closeForm
    const handleCancel = () => {
        closeForm();
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">
                    {isEditing ? 'Редактировать задачу' : 'Добавить задачу'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* ... поля ... */}
                    <div className="flex gap-2 mt-4">
                        <button type="submit" disabled={isPending} className="...">
                            {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
                        </button>
                        <button type="button" onClick={handleCancel} className="...">
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};