export interface Note {
  id: string;
  title: string;
  content?: string;
  todos: Todo[];
  createdAt: string;
  updatedAt?: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface RawNoteResponse {
  id: string;
  title: string;
  content?: string;
  todos?: Array<{ id?: string; text: string; completed?: boolean }>;
  createdAt?: string;
}

export interface NoteCardProps {
  note: Note;
  onUpdate: (updated: Note) => void;
}