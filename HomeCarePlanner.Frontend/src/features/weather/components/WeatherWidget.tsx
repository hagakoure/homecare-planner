import {useWeather} from '../hooks/useWeather';

export const WeatherWidget = ({city = 'Moscow'}) => {
    const {data} = useWeather(city);

    if (!data) return <div className="text-gray-500">Загрузка погоды...</div>;

    const {main, weather, name} = data;
    const iconCode = weather[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4">
            {iconUrl && <img src={iconUrl} alt="Погода" className="w-12 h-12"/>}
            <div>
                <div className="text-2xl font-bold">{Math.round(main.temp)}°C</div>
                <div className="text-gray-600 dark:text-gray-300">{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {weather[0]?.description}
                </div>
            </div>
        </div>

    );
};