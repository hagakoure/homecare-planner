import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';

export function App() {
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
}