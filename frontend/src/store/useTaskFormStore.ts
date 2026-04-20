import { create } from 'zustand';

interface TaskFormState {
    isOpen: boolean;
    taskId: string | null;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export const useTaskFormStore = create<TaskFormState>((set) => ({
    isOpen: false,
    taskId: null,
    openForm: (id) => set({ isOpen: true, taskId: id }),
    closeForm: () => set({ isOpen: false, taskId: null }),
}));