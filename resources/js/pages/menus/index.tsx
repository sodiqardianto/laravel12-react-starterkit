import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormDataConvertible } from '@inertiajs/core';
import { Head, router, usePage } from '@inertiajs/react';
import { GripVertical, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { capitalizeWords } from '@/lib/utils';
import { useModalStore } from '@/stores/modal-stores';
import { BreadcrumbItem, SharedData } from '@/types';
import { toast } from 'sonner';
import { MenuForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Menu', href: '/menus' }];

interface Menu {
    id: number;
    name: string;
    children?: Menu[];
    [key: string]: FormDataConvertible;
}

export default function IndexMenu() {
    const { openModal } = useModalStore();
    const defaultMenus = usePage<SharedData>().props.menus as Menu[];
    const [menus, setMenus] = useState<Menu[]>(defaultMenus);

    useEffect(() => {
        setMenus(defaultMenus);
    }, [defaultMenus]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleAddClick = () => {
        openModal({
            title: 'Tambah Menu',
            description: 'Isi data menu baru',
            content: <MenuForm />,
        });
    };

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Title */}
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen Menu</h1>

                {/* Toolbar */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Input placeholder="Cari menu..." className="w-full sm:w-[300px]" />
                    <Button onClick={handleAddClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Menu
                    </Button>
                </div>

                {/* Sortable Accordion */}
                <Card>
                    <CardContent className="pt-6">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={menus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                                <Accordion type="multiple" className="w-full">
                                    {menus.map((menu) => (
                                        <SortableAccordionItem key={menu.id} menu={menu} setMenus={setMenus} />
                                    ))}
                                </Accordion>
                            </SortableContext>
                        </DndContext>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function SortableAccordionItem({ menu, setMenus }: { menu: Menu; setMenus: React.Dispatch<React.SetStateAction<Menu[]>> }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const hasChildren = menu.children && menu.children.length > 0;
    const submenuSensors = useSensors(useSensor(PointerSensor)); // Moved this line up

    const handleSubmenuDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setMenus((prevMenus) => {
            const updatedMenus = prevMenus.map((parentMenu) => {
                if (parentMenu.id === menu.id && parentMenu.children) {
                    const oldIndex = parentMenu.children.findIndex((item) => item.id === active.id);
                    const newIndex = parentMenu.children.findIndex((item) => item.id === over.id);
                    const newChildren = arrayMove(parentMenu.children, oldIndex, newIndex);
                    // Create new object references for each child to force re-render
                    const newChildrenWithNewRefs = newChildren.map((child) => ({ ...child }));
                    return { ...parentMenu, children: newChildrenWithNewRefs };
                }
                return parentMenu;
            });
            // Send the updatedMenus to the backend
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
            return updatedMenus; // Return the updated state for local rendering
        });
    };

    return hasChildren ? (
        <AccordionItem value={menu.id.toString()}>
            <div ref={setNodeRef} style={style} {...attributes} className="mb-1 flex items-center rounded-md border bg-background px-4 py-2">
                {/* Drag Handle */}
                <div {...listeners} className="cursor-grab pr-2 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                </div>

                {/* Accordion Trigger (harus single child, tidak pakai asChild) */}
                <AccordionTrigger className="flex-1 cursor-pointer justify-start text-base">
                    <span className="font-medium">{capitalizeWords(menu.name)}</span>
                </AccordionTrigger>
            </div>

            <AccordionContent className="space-y-2 pl-10">
                <DndContext sensors={submenuSensors} collisionDetection={closestCenter} onDragEnd={handleSubmenuDragEnd}>
                    <SortableContext items={menu.children?.map((c) => c.id) || []} strategy={verticalListSortingStrategy}>
                        {menu.children?.map((child) => <SortableSubmenuItem key={child.id} menu={child} />)}
                    </SortableContext>
                </DndContext>
            </AccordionContent>
        </AccordionItem>
    ) : (
        <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-1 flex rounded-md border bg-background px-4 py-4">
            <div className="flex items-center">
                <div className="cursor-grab pr-2 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                </div>
                <span className="font-medium">{capitalizeWords(menu.name)}</span>
            </div>
        </Card>
    );
}

function SortableSubmenuItem({ menu }: { menu: Menu }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-1 flex cursor-grab rounded-md border bg-background px-4 py-2"
        >
            <div className="flex py-1">
                <div className="pr-2 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                </div>
                <span className="font-medium">{capitalizeWords(menu.name)}</span>
            </div>
        </Card>
    );
}
