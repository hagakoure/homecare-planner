// src/store/useThemeStore.ts
import { create } from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    toggleTheme: () => set((state) => {
        const newIsDark = !state.isDark;
        // Сохраняем в localStorage
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        return { isDark: newIsDark };
    }),
}));

// Инициализация при старте
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    useThemeStore.setState({ isDark: true });
}