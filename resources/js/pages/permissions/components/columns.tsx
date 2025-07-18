import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { capitalizeWords } from '@/lib/utils';
import { TooltipButtonProps } from '@/types/tooltip-button.types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Trash2 } from 'lucide-react';
import { Permission } from '../types/permissions.types';

const TooltipButton = ({ children, tooltip, onClick, className = '', title, variant = 'ghost', size = 'sm' }: TooltipButtonProps) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button variant={variant} size={size} onClick={onClick} className={className} title={title}>
                {children}
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>{tooltip}</p>
        </TooltipContent>
    </Tooltip>
);

interface ActionsProps {
    canEdit: boolean;
    canDelete: boolean;
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
}

export const createColumns = ({ canEdit, canDelete, onEdit, onDelete }: ActionsProps): ColumnDef<Permission>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'group_id',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accessorFn: (row: any) => capitalizeWords(row.group?.name) ?? '-',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Group
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const permission = row.original;

            if (!canEdit && !canDelete) {
                return null;
            }

            return (
                <div className="flex items-center gap-2">
                    {canEdit && (
                        <TooltipButton
                            tooltip="Edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(permission);
                            }}
                            className="h-8 w-8 p-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            title="Edit Permission"
                        >
                            <Pen className="h-4 w-4" />
                        </TooltipButton>
                    )}

                    {canDelete && (
                        <TooltipButton
                            tooltip="Delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(permission);
                            }}
                            className="h-8 w-8 p-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Delete Permission"
                        >
                            <Trash2 className="h-4 w-4" />
                        </TooltipButton>
                    )}
                </div>
            );
        },
    },
];
