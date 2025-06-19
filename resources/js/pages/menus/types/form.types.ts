import { DragListeners, Menu } from './menu.types';

export type MenuFormData = {
    name: string;
    href: string;
    icon: string;
    parent_id: string | null;
};

export interface MenuFormProps {
    menu?: Menu;
}

export interface MenuItemContentProps {
    menu: Menu;
    listeners: DragListeners;
    onEdit: (menu: Menu) => void;
    onDelete: (menu: Menu) => void;
    isAccordionTrigger: boolean;
}
