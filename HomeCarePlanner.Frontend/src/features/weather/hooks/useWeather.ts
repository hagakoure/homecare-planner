import { useQuery } from '@tanstack/react-query';

export interface WeatherData {
    main: { temp: number; humidity: number };
    weather: { main: string; description: string; icon: string }[];
    name: string;
}

export const useWeather = (city: string = 'Moscow') => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
    console.log('API Key:', API_KEY); //todo: временно
    return useQuery<WeatherData>({
        queryKey: ['weather', city],
        queryFn: async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch weather');
            return res.json();
        },
        staleTime: 10 * 60 * 1000, // обновлять каждые 10 минут
    });
};