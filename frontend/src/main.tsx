import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import App from './app/App';
import {TasksPage} from "@/app/pages/TasksPage.tsx";
import {NotesPage} from "@/app/pages/NotesPage.tsx";
import {HomePage} from "@/app/pages/HomePage.tsx";

const useApplyTheme = () => {
    const isDark = useThemeStore(state => state.isDark);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);
};

const queryClient = new QueryClient();

// 🔹 Роутер с вложенными маршрутами
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App содержит навбар + <Outlet />
        children: [
            { index: true, element: <HomePage /> },
            { path: 'tasks', element: <TasksPage /> },
            { path: 'notes', element: <NotesPage /> },
        ],
    },
]);

// 🔹 Экспортированный Root — фикс для ESLint
export function Root() {
    useApplyTheme();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

// 🔹 Рендер
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);