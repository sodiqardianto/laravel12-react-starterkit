import { AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';
import { Menu } from '../types/menu.types';
import { MenuItemContent } from './menu-item-content';
import { SubmenuList } from './submenu-list';

interface SortableAccordionItemProps {
    menu: Menu;
    setMenus: Dispatch<SetStateAction<Menu[]>>;
    onEdit: (menu: Menu) => void;
    onDelete: (menu: Menu) => void;
    onSubmenuDelete: (submenu: Menu, parentMenuId: number) => void;
    onSubmenuEdit: (menu: Menu) => void;
}

export function SortableAccordionItem({ menu, setMenus, onEdit, onDelete, onSubmenuDelete, onSubmenuEdit }: SortableAccordionItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const hasChildren = menu.children && menu.children.length > 0;

    return hasChildren ? (
        <AccordionItem value={menu.id.toString()} className="solid overflow-hidden rounded-lg border py-2 shadow-sm">
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                className="flex items-center justify-between bg-background px-4 py-3 transition-colors hover:bg-muted/50"
            >
                <MenuItemContent menu={menu} listeners={listeners} onEdit={onEdit} onDelete={onDelete} isAccordionTrigger={true} />
            </div>

            <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down bg-muted/20 px-4 pt-2 pb-4">
                <div className="space-y-2 pl-6">
                    <SubmenuList menu={menu} setMenus={setMenus} onEdit={onSubmenuEdit} onDelete={onSubmenuDelete} />
                </div>
            </AccordionContent>
        </AccordionItem>
    ) : (
        <Card ref={setNodeRef} style={style} {...attributes} className="mb-1 flex rounded-md border bg-background px-4 py-5">
            <MenuItemContent menu={menu} listeners={listeners} onEdit={onEdit} onDelete={onDelete} isAccordionTrigger={false} />
        </Card>
    );
}
