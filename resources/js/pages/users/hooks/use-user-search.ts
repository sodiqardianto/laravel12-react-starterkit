import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function useUserSearch() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set('search', value);
        } else {
            url.searchParams.delete('search');
        }
        window.history.replaceState({}, '', url.toString());
    };

    const handleSearchSubmit = () => {
        router.get(window.location.pathname, { search: searchTerm }, { preserveState: true });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            setSearchTerm(searchParam);
        }
    }, []);

    return { searchTerm, handleSearchChange, handleSearchSubmit };
}
