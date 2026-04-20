import { useState } from 'react';
import type {NoteCardProps} from "@/features/notes/types.ts";
import { useDeleteNote } from '../hooks/useDeleteNote';

export const NoteCard = ({ note, onUpdate }: NoteCardProps) => {
    const [todos, setTodos] = useState(note.todos);
    const deleteMutation = useDeleteNote();
    
    const toggleTodo = (id: string) => {
        const updated = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updated);
        onUpdate({ ...note, todos: updated });
    };

    const handleDelete = () => {
        if (confirm(`Удалить заметку "${note.title}"?`)) {
            deleteMutation.mutate(note.id);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
            {note.content && <p className="text-gray-600 mt-1">{note.content}</p>}

            <div className="mt-3 space-y-2">
                {todos.map(todo => (
                    <label key={todo.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
              {todo.text}
            </span>
                    </label>
                ))}
            </div>

            <div className="mt-3 text-sm text-gray-500">
                Создано: {new Date(note.createdAt).toLocaleDateString()}
            </div>
            <button onClick={handleDelete} className="...">🗑️ Удалить</button>
        </div>
    );
};