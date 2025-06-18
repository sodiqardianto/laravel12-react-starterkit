import { useEffect, useState } from 'react';
import { Menu } from '../types/menu.types';

export function useMenuSearch(menus: Menu[]) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredMenus = menus.filter((menu) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        const menuNameMatch = menu.name.toLowerCase().includes(searchLower);
        const childrenMatch = menu.children?.some((child) => child.name.toLowerCase().includes(searchLower));

        return menuNameMatch || childrenMatch;
    });

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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            setSearchTerm(searchParam);
        }
    }, []);

    return { searchTerm, filteredMenus, handleSearchChange };
}
