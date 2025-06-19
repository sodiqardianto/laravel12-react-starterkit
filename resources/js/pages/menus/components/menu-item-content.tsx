import { DynamicIcon } from '@/components/dynamic-icon';
import { AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { capitalizeWords } from '@/lib/utils';
import { GripVertical, PenIcon, TrashIcon } from 'lucide-react';
import { MenuItemContentProps } from '../types/form.types';

export function MenuItemContent({ menu, listeners, onEdit, onDelete, isAccordionTrigger }: MenuItemContentProps) {
    const menuContent = (
        <div className="flex items-center gap-2">
            <DynamicIcon name={menu.icon} />
            <span className={isAccordionTrigger ? 'cursor-pointer font-medium' : 'font-medium'}>{capitalizeWords(menu.name)}</span>
        </div>
    );

    return (
        <div className="flex w-full items-center">
            <div {...listeners} className="cursor-grab pr-2 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
            </div>

            <div className="flex w-full items-center justify-between">
                {isAccordionTrigger ? (
                    <AccordionTrigger className="flex-1 justify-start p-0 text-base hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {menuContent}
                    </AccordionTrigger>
                ) : (
                    menuContent
                )}

                <div className="flex items-center gap-2">
                    <Button
                        variant={'ghost'}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(menu);
                        }}
                        className="text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
                        title="Edit Menu"
                    >
                        <PenIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={isAccordionTrigger ? 'ghost' : 'destructive'}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(menu);
                        }}
                        className="bg-destructive text-white transition-colors hover:bg-red-500 hover:text-white dark:bg-destructive dark:text-white dark:hover:bg-red-500 dark:hover:text-white"
                        title="Hapus Menu"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
