import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { SubmenuListProps } from '../types/menu.types';
import { SortableSubmenuItem } from './sortable-submenu-item';

export function SubmenuList({ menu, setMenus, onEdit, onDelete, canEdit, canDelete, canSort }: SubmenuListProps) {
    const submenuSensors = useSensors(useSensor(PointerSensor));

    const handleSubmenuDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setMenus((prevMenus) => {
            const updatedMenus = prevMenus.map((parentMenu) => {
                if (parentMenu.id === menu.id && parentMenu.children) {
                    const oldIndex = parentMenu.children.findIndex((item) => item.id === active.id);
                    const newIndex = parentMenu.children.findIndex((item) => item.id === over.id);
                    const newChildren = arrayMove(parentMenu.children, oldIndex, newIndex);
                    const newChildrenWithNewRefs = newChildren.map((child) => ({ ...child }));
                    return { ...parentMenu, children: newChildrenWithNewRefs };
                }
                return parentMenu;
            });

            router.post(
                '/menus/reorder',
                { menus: updatedMenus },
                {
                    onSuccess: () => {
                        toast.success('Submenu berhasil diurutkan ulang!');
                        router.reload({ only: ['menus'] });
                    },
                    onError: () => {
                        toast.error('Gagal mengurutkan ulang submenu.');
                    },
                },
            );
            return updatedMenus;
        });
    };

    return (
        <DndContext sensors={submenuSensors} collisionDetection={closestCenter} onDragEnd={handleSubmenuDragEnd}>
            <SortableContext items={menu.children?.map((c) => c.id) || []} strategy={verticalListSortingStrategy}>
                {menu.children?.map((child) => (
                    <SortableSubmenuItem
                        key={child.id}
                        menu={child}
                        parentMenuId={menu.id}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        canEdit={canEdit}
                        canDelete={canDelete}
                        canSort={canSort}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}
