// src/app/pages/NotesPage.tsx
import {NoteCard} from '@/features/notes/components/NoteCard';
import {useNotes} from '@/features/notes/hooks/useNotes';
import {NoteFormDialog} from '@/features/notes/components/NoteFormDialog';
import {useTaskFormStore} from '@/store/useTaskFormStore';

export const NotesPage = () => {
    
    const {data} = useNotes();
    
    const isOpen = useTaskFormStore((state) => state.isOpen);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📝 Заметки</h1>
                <button
                    onClick={() => useTaskFormStore.getState().openForm('note-new')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Добавить заметку
                </button>
            </div>

            {data && data.length > 0 ? (
                <div className="space-y-4">
                    📋
                    {data?.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onUpdate={(updatedNote) => {
                                console.log('Обновление заметки:', updatedNote);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Нет заметок</p>
            )}

            {isOpen && <NoteFormDialog/>}
        </div>
    );
};