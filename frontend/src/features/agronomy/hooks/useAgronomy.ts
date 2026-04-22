import { useQuery } from '@tanstack/react-query';
import type { AgronomyRecommendation } from '@/core/types/AgronomyRecommendation';

export const useAgronomy = (region: string, month: number) => {
    return useQuery<AgronomyRecommendation[]>({
        queryKey: ['agronomy', region, month],
        queryFn: async () => {
            const url = `http://localhost:5282/api/agronomy?region=${region}&month=${month}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch agronomy data');
            return res.json();
        },
    });
};