export interface Note {
  id: string;
  title: string;
  content: string;
  todos: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  createdAt: string;
}
