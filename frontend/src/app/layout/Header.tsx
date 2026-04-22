// src/app/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import {useThemeStore} from "@/store/useThemeStore.ts";

export const Header = () => {
    const location = useLocation();
    const isDark = useThemeStore((state) => state.isDark);
    const toggleTheme = useThemeStore(state => state.toggleTheme);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
                    🏠 Домовой
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
                    <Link
                        to="/agronomy"
                        className={`${
                            location.pathname === '/agronomy'
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                    >
                        Агрономия
                    </Link>
                </nav>

                <button onClick={toggleTheme} aria-label="Переключить тему">
                    {isDark ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
};