import { create } from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set, get) => ({
    isDark: false,
    toggleTheme: () => {
        const newIsDark = !get().isDark;
        set({ isDark: newIsDark });
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    },
}));


if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        useThemeStore.setState({ isDark: true });
    }
}

export { useThemeStore };