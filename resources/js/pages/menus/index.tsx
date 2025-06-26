import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SortableAccordionItem } from './components/sortable-accordion-item';
import { useDragHandlers } from './hooks/use-drag-handlers';
import { useMenuActions } from './hooks/use-menu-actions';
import { useMenuSearch } from './hooks/use-menu-search';
import { Menu } from './types/menu.types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Menu', href: '/menus' }];

export default function IndexMenu() {
    const defaultMenus = usePage<SharedData>().props.menus as Menu[];
    const [menus, setMenus] = useState<Menu[]>(defaultMenus);

    useEffect(() => {
        setMenus(defaultMenus);
    }, [defaultMenus]);

    const { searchTerm, filteredMenus, handleSearchChange } = useMenuSearch(menus);
    const menuActions = useMenuActions(setMenus);
    const sensors = useSensors(useSensor(PointerSensor));
    const { handleDragEnd } = useDragHandlers(menus, setMenus);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen Menu</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Input placeholder="Cari menu..." className="w-full sm:w-[300px]" value={searchTerm} onChange={handleSearchChange} />
                    <Button onClick={menuActions.handleAdd} className="mt-2 sm:mt-0">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Menu
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={filteredMenus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                                <Accordion type="multiple" className="w-full space-y-2">
                                    {filteredMenus.length === 0 ? (
                                        <div className="text-center text-muted-foreground">Menu tidak ditemukan</div>
                                    ) : (
                                        filteredMenus.map((menu) => (
                                            <SortableAccordionItem
                                                key={menu.id}
                                                menu={menu}
                                                setMenus={setMenus}
                                                onEdit={menuActions.handleEdit}
                                                onDelete={menuActions.handleDelete}
                                                onSubmenuDelete={menuActions.handleSubmenuDelete}
                                                onSubmenuEdit={menuActions.handleEdit}
                                            />
                                        ))
                                    )}
                                </Accordion>
                            </SortableContext>
                        </DndContext>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
