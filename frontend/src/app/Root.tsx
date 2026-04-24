import  { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { router } from './router.js';

const queryClient = new QueryClient();

export const Root = () => {
    const isDark = useThemeStore((state) => state.isDark);
    const initializeTheme = useThemeStore((state) => state.initializeTheme);

    // Инициализация один раз при старте
    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    // Синхронизация с DOM
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};