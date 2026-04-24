import {useState, useEffect, useRef} from 'react';
import {useThemeStore} from '@/shared/lib/stores/useThemeStore';
import {useUrgentTasks} from '@/entities/task/api/useUrgentTasks';

export function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {isDark, toggleTheme} = useThemeStore();
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfile = () => setIsProfileOpen(prev => !prev);

    const {urgentTasks} = useUrgentTasks();
    const urgentCount = urgentTasks?.length ?? 0;
    return (
        <header
            className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Логотип */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">🏡</span>
                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50">
            HomeCare Planner
          </span>
                </div>

                {/* Поиск */}
                <div className="flex-1 mx-8 max-w-xl">
                    <div className="w-full rounded-lg 
      border border-gray-300 dark:border-gray-700 
      bg-gray-50 dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      placeholder-gray-500 dark:placeholder-gray-400
      focus:border-blue-500 focus:ring-blue-500/20">
                        <input
                            type="search"
                            placeholder="Поиск задач, заметок..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-gray-900"
                        />
                        <svg
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>

                {/* Действия */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-full p-2 
                        text-gray-600 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
                        title={isDark ? 'Светлая тема' : 'Тёмная тема'}
                    >
                        <span className="text-lg" aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
                    </button>

                    {/* Уведомления */}
                    <button
                        type="button"
                        className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 
    dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Уведомления"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>

                        {/* Бейдж с количеством */}
                        {urgentCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center 
      rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900"
                            >
      {urgentCount > 9 ? '9+' : urgentCount}
    </span>
                        )}
                    </button>

                    {/* Профиль */}
                    <div ref={profileRef} className="relative">
                        <button
                            type="button"
                            onClick={toggleProfile}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700 hover:bg-blue-200 transition-colors dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
                            aria-expanded={isProfileOpen}
                            aria-haspopup="true"
                        >
                            Ю
                        </button>

                        {isProfileOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:ring-white dark:ring-opacity-10">
                                <a href="/profile"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Профиль</a>
                                <a href="/settings"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Настройки</a>
                                <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"/>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">Выйти
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}