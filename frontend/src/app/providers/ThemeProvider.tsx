import { useEffect } from 'react';
import { useThemeStore } from "@/shared/lib/stores/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const isDark = useThemeStore(state => state.isDark);

    useEffect(() => {
        // Синхронизируем с <html> для работы Tailwind dark:
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
    }, [isDark]);

    return <>{children}</>;
}