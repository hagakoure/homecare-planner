export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content?: string;
  todos: Todo[];
  createdAt: string;
}

export interface NoteCardProps {
  note: Note;
  onUpdate: (updated: Note) => void;
}