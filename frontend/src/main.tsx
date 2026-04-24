import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './app/router';
import { ThemeProvider } from './app/providers/ThemeProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 минут
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider> {/* ← вся логика dark mode здесь */}
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);