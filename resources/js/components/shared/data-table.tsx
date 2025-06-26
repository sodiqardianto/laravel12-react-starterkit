'use client';

import {
    ColumnDef,
    // ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { ServerPagination } from './server-pagination';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        per_page?: string;
    };
    onBulkDelete?: (selectedIds: number[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, pagination, filters, onBulkDelete }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    const { url } = usePage();
    const baseUrl = url.split('?')[0];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        manualPagination: true,
        pageCount: pagination.last_page,
    });

    const handleSearch = (value: string) => {
        setSearchValue(value);
        // Debounce search
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        const newTimeout = setTimeout(() => {
            router.get(
                baseUrl,
                {
                    search: value || undefined,
                    per_page: filters.per_page,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);
        setSearchTimeout(newTimeout);
    };

    // Cleanup timeout saat component unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <div>
            <div className="flex items-center py-4">
                <Input placeholder="Cari ..." value={searchValue} onChange={(event) => handleSearch(event.target.value)} className="max-w-sm" />

                {table.getAllColumns().length > 3 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Kolom
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {Object.keys(rowSelection).length > 0 && onBulkDelete && (
                    <Button
                        variant="destructive"
                        className="ml-4"
                        onClick={async () => {
                            const selectedRows = table.getSelectedRowModel().rows;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const selectedIds = selectedRows.map((row) => (row.original as any).id);
                            await onBulkDelete(selectedIds);
                            table.resetRowSelection();
                        }}
                    >
                        Hapus Terpilih
                    </Button>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Data tidak ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <ServerPagination pagination={pagination} filters={filters} />
        </div>
    );
}
