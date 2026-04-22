
import { Outlet } from 'react-router-dom';
import { Header } from './layout/Header.js';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="py-6">
                <Outlet />
            </main>
        </div>
    );
}