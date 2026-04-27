import { useQuery } from '@tanstack/react-query';
export const useCategories = () =>
    useQuery<{ id: string; name: string; description: string | null }[]>({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5282/api/categories').then(r => r.json()),
    });