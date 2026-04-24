import {useQuery} from '@tanstack/react-query';
import type {Note, RawNoteResponse} from '@/entities/note/model/types';

export const useNotes = () => {
    return useQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: async (): Promise<Note[]> => {
            const res = await fetch('http://localhost:5282/api/notes');
            if (!res.ok) throw new Error(`Failed to fetch notes: ${res.status}`);
            const data: RawNoteResponse[] = await res.json();

            return data.map((item): Note => {
                const note: Omit<Note, 'content'> = {
                    id: item.id,
                    title: item.title,
                    createdAt: item.createdAt || new Date().toISOString(),
                    todos: (item.todos || []).map(t => ({
                        id: t.id || crypto.randomUUID(),
                        text: t.text,
                        completed: Boolean(t.completed),
                    })),
                };

                if (item.content !== undefined && item.content !== null) {
                    return {...note, content: item.content};
                }

                return note as Note;
            });
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};