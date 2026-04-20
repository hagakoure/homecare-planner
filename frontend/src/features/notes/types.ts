import type { Note } from '@/core/types/Note';

export interface NoteCardProps {
    note: Note;
    onUpdate: (updatedNote: Note) => void;
}