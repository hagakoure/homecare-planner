import { NavLink } from 'react-router-dom';
import { useThemeStore } from '@/shared/lib/stores/useThemeStore';

const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/tasks', label: 'Задачи', icon: '📋' },
    { path: '/notes', label: 'Заметки', icon: '📝' },
    { path: '/agronomy', label: 'Агрономия', icon: '🌱' },
];

export function Sidebar() {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <aside className="w-64 h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col transition-colors duration-200"
        >
            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    <span className="text-lg">{isDark ? '☀️' : '🌙'}</span>
                    {isDark ? 'Светлая тема' : 'Тёмная тема'}
                </button>
            </div>
        </aside>
    );
}