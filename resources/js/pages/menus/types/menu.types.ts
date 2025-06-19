import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { FormDataConvertible } from '@inertiajs/core';
import { Dispatch, SetStateAction } from 'react';

export interface Menu {
    id: number;
    name: string;
    href: string;
    icon: string;
    parent_id: number | null;
    children?: Menu[];
    [key: string]: FormDataConvertible;
}

export type DragListeners = SyntheticListenerMap | undefined;

export interface MenuListProps {
    menus: Menu[];
    setMenus: Dispatch<SetStateAction<Menu[]>>;
    actions: {
        handleEdit: (menu: Menu) => void;
        handleDelete: (menu: Menu) => void;
        handleSubmenuDelete: (submenu: Menu, parentMenuId: number) => void;
    };
}

export interface SortableAccordionItemProps {
    menu: Menu;
    setMenus: Dispatch<SetStateAction<Menu[]>>;
    onEdit: (menu: Menu) => void;
    onDelete: (menu: Menu) => void;
    onSubmenuDelete: (submenu: Menu, parentMenuId: number) => void;
    onSubmenuEdit: (menu: Menu) => void;
}

export interface SortableSubmenuItemProps {
    menu: Menu;
    parentMenuId: number;
    onEdit: (menu: Menu) => void;
    onDelete: (submenu: Menu, parentMenuId: number) => void;
}

export interface SubmenuListProps {
    menu: Menu;
    setMenus: Dispatch<SetStateAction<Menu[]>>;
    onEdit: (menu: Menu) => void;
    onDelete: (submenu: Menu, parentMenuId: number) => void;
}
