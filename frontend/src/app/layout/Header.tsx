// src/app/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';

export const Header = () => {
    const location = useLocation();
    const isDark = useThemeStore(state => state.isDark);
    const toggleTheme = useThemeStore(state => state.toggleTheme);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
                    HomeCare Planner
                </Link>

                <nav className="flex gap-6">
                    <Link
                        to="/tasks"
                        className={`${
                            location.pathname === '/tasks'
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                    >
                        Задачи
                    </Link>
                    <Link
                        to="/notes"
                        className={`${
                            location.pathname === '/notes'
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                    >
                        Заметки
                    </Link>
                </nav>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    aria-label="Переключить тему"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
};