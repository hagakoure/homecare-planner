import { useState } from 'react';
import type { NoteCardProps } from '@/entities/note/model/types'; 
import { useDeleteNote } from '@/entities/note/api/useDeleteNote';

export const NoteCard = ({ note, onUpdate }: NoteCardProps) => {
    const [todos, setTodos] = useState<typeof note.todos>(note.todos);

    const deleteMutation = useDeleteNote();

    const toggleTodo = (id: string) => {

        const updated = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updated);
        onUpdate({ ...note, todos: updated });
    };

    const handleDelete = () => {
        if (window.confirm(`Удалить заметку "${note.title}"?`)) {
            deleteMutation.mutate(note.id);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{note.title}</h3>
            {note.content && <p className="text-gray-600 dark:text-gray-300 mt-1">{note.content}</p>}

            <div className="mt-3 space-y-2">
                {todos.map(todo => (
                    <label key={todo.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}>
                            {todo.text}
                        </span>
                    </label>
                ))}
            </div>

            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Создано: {new Date(note.createdAt).toLocaleDateString()}
            </div>

            <button
                onClick={handleDelete}
                className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium"
            >
                🗑️ Удалить
            </button>
        </div>
    );
};