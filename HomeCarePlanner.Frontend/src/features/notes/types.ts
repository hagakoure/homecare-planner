import type { Note } from '@/entities/note/model/types';

export interface NoteCardProps {
    note: Note;
    onUpdate: (updatedNote: Note) => void;
}