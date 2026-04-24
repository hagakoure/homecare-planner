import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/core/types/Note';

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newNote: Omit<Note, 'id' | 'createdAt'>) => {
            const noteToCreate = {
                ...newNote,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };
            const res = await fetch('http://localhost:5282/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteToCreate),
            });
            if (!res.ok) throw new Error('Failed to create note');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};