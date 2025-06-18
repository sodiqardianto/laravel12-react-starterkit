import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { capitalizeWords } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, PenIcon, TrashIcon } from 'lucide-react';
import { Menu } from '../types/menu.types';

interface SortableSubmenuItemProps {
    menu: Menu;
    parentMenuId: number;
    onEdit: (menu: Menu) => void;
    onDelete: (submenu: Menu, parentMenuId: number) => void;
}

export function SortableSubmenuItem({ menu, parentMenuId, onEdit, onDelete }: SortableSubmenuItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card ref={setNodeRef} style={style} {...attributes} className="mb-1 flex cursor-grab rounded-md border bg-background px-4 py-2">
            <div className="flex w-full items-center">
                <div {...listeners} className="pr-2 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex w-full items-center justify-between">
                    <span className="font-medium">{capitalizeWords(menu.name)}</span>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={'ghost'}
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(menu);
                            }}
                            className="text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
                            title="Edit Submenu"
                        >
                            <PenIcon className="h-3 w-3" />
                        </Button>
                        <Button
                            variant={'destructive'}
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(menu, parentMenuId);
                            }}
                            className="bg-destructive text-white transition-colors hover:bg-red-500 hover:text-white dark:bg-destructive dark:text-white dark:hover:bg-red-500 dark:hover:text-white"
                            title="Hapus Submenu"
                        >
                            <TrashIcon className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
