import type { MaintenanceTask } from '@/entities/task/model/types';
import {useCategories} from "@/entities/category/api/useCategories.ts";

interface Props {
    task?: MaintenanceTask;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<MaintenanceTask, 'id' | 'createdAt' | 'isDue' | 'daysUntilDue'>) => void;
    isLoading: boolean;
}
const {  data } = useCategories();

export function TaskFormDialog({ task, isOpen, onClose, onSubmit, isLoading }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    onSubmit({
                        title: fd.get('title') as string,
                        description: fd.get('description') as string || null,
                        intervalDays: Number(fd.get('intervalDays')),
                        category: fd.get('category') as any,
                        lastReplacement: fd.get('lastReplacement') as string || null,
                    });
                }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4 shadow-2xl"
            >
                <h2 className="text-xl font-bold">{task ? 'Редактировать задачу' : 'Новая задача'}</h2>
                <input name="title" defaultValue={task?.title} placeholder="Название" required className="w-full p-2 border rounded dark:bg-gray-700" />
                <textarea name="description" defaultValue={task?.description || ''} placeholder="Описание" className="w-full p-2 border rounded dark:bg-gray-700" />
                <input type="number" name="intervalDays" defaultValue={task?.intervalDays || 30} min="1" required className="w-full p-2 border rounded dark:bg-gray-700" placeholder="Интервал (дней)" />
                <select name="categoryId" defaultValue={task?.categoryId} required className="...">
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input type="date" name="lastReplacement" defaultValue={task?.lastReplacement?.split('T')[0]} className="w-full p-2 border rounded dark:bg-gray-700" />

                <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={isLoading} className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300">Отмена</button>
                </div>
            </form>
        </div>
    );
}