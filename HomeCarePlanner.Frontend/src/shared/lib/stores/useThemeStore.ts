import {create} from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    isDark: false,

    toggleTheme: () => {
        const newIsDark = !get().isDark;
        set({isDark: newIsDark});
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    },

    initializeTheme: () => {
        if (typeof window === 'undefined') return;

        const saved = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = saved ? saved === 'dark' : systemPrefersDark;

        set({isDark: shouldUseDark});
    },
}));