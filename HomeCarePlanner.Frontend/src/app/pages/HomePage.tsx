
import { WeatherWidget } from '@/features/weather/components/WeatherWidget';

export function HomePage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Добро пожаловать в HomeCare Planner!</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Погода сегодня</h2>
                <WeatherWidget city="Moscow" />
            </div>

            <p className="text-gray-600 dark:text-gray-300">
                Используйте меню, чтобы управлять задачами, заметками и агрономическим календарём.
            </p>
        </div>
    );
}