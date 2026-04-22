import {useState} from 'react';
import {useAgronomy} from '@/features/agronomy/hooks/useAgronomy';

const regions = ['central', 'south', 'north', 'ural'];
const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const AgronomyPage = () => {
    const [region, setRegion] = useState('central');
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const {data} = useAgronomy(region, month);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Агрономический календарь</h1>

            <div className="flex gap-4 mb-6">
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                >
                    {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                >
                    {months.map((name, idx) => (
                        <option key={idx + 1} value={idx + 1}>{name}</option>
                    ))}
                </select>
            </div>

            {data && data.length > 0 ? (
                <ul className="space-y-2">
                    {data.map((rec, i) => (
                        <li key={i} className="p-3 bg-white dark:bg-gray-800 rounded shadow">
                            <strong>{rec.crop}</strong>: {rec.action} (дни {rec.startDay}–{rec.endDay})
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Нет рекомендаций</p>
            )}
        </div>
    );
};