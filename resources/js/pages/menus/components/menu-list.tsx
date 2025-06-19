import { Accordion } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDragHandlers } from '../hooks/use-drag-handlers';
import { MenuListProps } from '../types/menu.types';
import { SortableAccordionItem } from './sortable-accordion-item';

export function MenuList({ menus, setMenus, actions }: MenuListProps) {
    const sensors = useSensors(useSensor(PointerSensor));
    const { handleDragEnd } = useDragHandlers(menus, setMenus);

    return (
        <Card>
            <CardContent className="pt-6">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={menus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {menus.length === 0 ? (
                                <div className="text-center text-muted-foreground">No menu found</div>
                            ) : (
                                menus.map((menu) => (
                                    <SortableAccordionItem
                                        key={menu.id}
                                        menu={menu}
                                        setMenus={setMenus}
                                        onEdit={actions.handleEdit}
                                        onDelete={actions.handleDelete}
                                        onSubmenuDelete={actions.handleSubmenuDelete}
                                        onSubmenuEdit={actions.handleEdit}
                                    />
                                ))
                            )}
                        </Accordion>
                    </SortableContext>
                </DndContext>
            </CardContent>
        </Card>
    );
}
