export type TaskStatus = 'normal' | 'upcoming' | 'overdue';

export const getTaskStatus = (nextDue: string): TaskStatus => {
    const now = new Date();
    const dueDate = new Date(nextDue);

    // Если просрочено
    if (dueDate < now) {
        return 'overdue';
    }

    // Если в этом месяце (и не просрочено)
    const isSameMonth =
        dueDate.getFullYear() === now.getFullYear() &&
        dueDate.getMonth() === now.getMonth();

    if (isSameMonth) {
        return 'upcoming';
    }

    return 'normal';
};