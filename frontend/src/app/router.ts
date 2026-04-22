// src/app/router.ts
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        lazy: () => import('./pages/HomePage.js').then(m => ({ Component: m.HomePage })),
    },
    {
        path: '/tasks',
        lazy: () => import('./pages/TasksPage.js').then(m => ({ Component: m.TasksPage })),
    },
    {
        path: '/notes',
        lazy: () => import('./pages/NotesPage.js').then(m => ({ Component: m.NotesPage })),
    },
    {
        path: '/agronomy',
        lazy: () => import('./pages/AgronomyPage.js').then(m => ({ Component: m.AgronomyPage })),
    },
]);