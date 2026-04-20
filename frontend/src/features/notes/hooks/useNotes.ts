// src/features/notes/hooks/useNotes.ts
import { useQuery } from '@tanstack/react-query';
import type { Note } from '@/core/types/Note';

export const useNotes = () => {
    return useQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5282/api/notes');
            if (!res.ok) throw new Error('Failed to fetch notes');
            const data = await res.json();
            
            return data.map((item: any) => ({
                ...item,
                createdAt: item.createdAt || new Date().toISOString(),
                todos: item.todos?.map((t: any) => ({
                    ...t,
                    completed: Boolean(t.completed),
                })) || [],
            }));
        },
    });
};