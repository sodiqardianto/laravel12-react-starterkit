import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { Menu } from '../types/menu.types';

export function useDragHandlers(menus: Menu[], setMenus: Dispatch<SetStateAction<Menu[]>>) {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = menus.findIndex((item) => item.id === active.id);
        const newIndex = menus.findIndex((item) => item.id === over.id);
        const newMenus = arrayMove(menus, oldIndex, newIndex);

        setMenus(newMenus);
        router.post(
            '/menus/reorder',
            { menus: newMenus },
            {
                onSuccess: () => {
                    toast.success('Menu berhasil diurutkan ulang!');
                    router.reload({ only: ['menus'] });
                },
                onError: () => {
                    toast.error('Gagal mengurutkan ulang menu.');
                },
            },
        );
    };

    return { handleDragEnd };
}
