import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { capitalizeWords } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pen, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';
import { User } from '../types/users.types';

// Komponen tooltip yang reusable
interface TooltipButtonProps {
    children: ReactNode;
    tooltip: string;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    title?: string;
    variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

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
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

// Fungsi untuk membuat columns dengan props
export const createColumns = ({ canEdit, canDelete, onEdit, onDelete }: ActionsProps): ColumnDef<User>[] => [
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
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'role',
        accessorFn: (row) => capitalizeWords(row.roles[0]?.name) ?? '-',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

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
                                onEdit(user);
                            }}
                            className="h-8 w-8 p-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            title="Edit User"
                        >
                            <Pen className="h-4 w-4" />
                        </TooltipButton>
                    )}

                    {canDelete && (
                        <TooltipButton
                            tooltip="Delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(user);
                            }}
                            className="h-8 w-8 p-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Delete User"
                        >
                            <Trash2 className="h-4 w-4" />
                        </TooltipButton>
                    )}
                </div>
            );
        },
    },
];
