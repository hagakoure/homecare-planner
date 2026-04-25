import { useState } from 'react';
import { useCreateNote } from "@/entities/note/api/useCreateNote";
import { useTaskFormStore } from "@/shared/lib/stores/useTaskFormStore";

export const NoteFormDialog = () => {
    const { closeForm } = useTaskFormStore();
    const { mutate: createNote, isPending } = useCreateNote();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [todos, setTodos] = useState<{ text: string }[]>([{ text: '' }]);

    const addTodo = () => {
        setTodos([...todos, { text: '' }]);
    };

    const updateTodo = (index: number, text: string) => {
        setTodos(prev => prev.map((todo, i) =>
            i === index ? { ...todo, text } : todo
        ));
    };

    const removeTodo = (index: number) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const todosWithIds = todos
            .filter(todo => todo.text.trim())
            .map(todo => ({
                id: crypto.randomUUID(),
                text: todo.text.trim(),
                completed: false,
            }));

        createNote({ title, content, todos: todosWithIds });
    };

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Добавить заметку</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Название *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Чекбоксы</label>
                            <button
                                type="button"
                                onClick={addTodo}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                + Добавить
                            </button>
                        </div>
                        <div className="space-y-2">
                            {todos.map((todo, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={todo.text}
                                        onChange={(e) => updateTodo(index, e.target.value)}
                                        placeholder="Введите задачу"
                                        className="flex-1 px-2 py-1 border rounded text-sm"
                                    />
                                    {todos.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTodo(index)}
                                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isPending || !title.trim()}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            {isPending ? 'Сохранение...' : 'Создать'}
                        </button>
                        <button
                            type="button"
                            onClick={closeForm}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};