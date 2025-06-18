import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { MenuFormData } from '../types/form.types';
import { Menu } from '../types/menu.types';

export const useMenuForm = (menu?: Menu) => {
    const initialData: MenuFormData = useMemo(
        () => ({
            name: menu?.name ?? '',
            href: menu?.href ?? '',
            icon: menu?.icon ?? '',
            parent_id: menu?.parent_id?.toString() ?? null,
        }),
        [menu],
    );

    return useForm<MenuFormData>(initialData);
};
