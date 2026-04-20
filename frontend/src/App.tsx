// src/app/App.tsx
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './app/pages/HomePage';
import { TasksPage } from './app/pages/TasksPage';
import { NotesPage } from './app/pages/NotesPage';
createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/tasks', element: <TasksPage /> },
    { path: '/notes', element: <NotesPage /> },
]);
export default function App() {
    return null; // или удали, если не используется напрямую
}

import { Outlet, NavLink } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';

export default function App() {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
            {/* Навбар */}
            <nav className="p-4 border-b dark:border-gray-700">
                <div className="max-w-6xl mx-auto flex gap-4">
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-300'
                    }>🏠 Home</NavLink>
                    <NavLink to="/tasks" className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-300'
                    }>📋 Tasks</NavLink>
                    <NavLink to="/notes" className={({ isActive }) =>
                        isActive ? 'text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-300'
                    }>📝 Notes</NavLink>

                    {/* Кнопка переключения темы */}
                    <button
                        onClick={toggleTheme}
                        className="ml-auto px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
                    >
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </nav>

            {/* Контент страницы — рендерится здесь */}
            <main>
                <Outlet /> {/* 👈 Ключевой компонент для вложенных маршрутов */}
            </main>
        </div>
    );
}