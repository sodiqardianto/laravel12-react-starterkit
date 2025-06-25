import { DataTable } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination.types';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { createColumns } from './components/columns';
import { usePermissionActions } from './hooks/use-permission-actions';
import { Permission } from './types/permissions.types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Permission', href: '/permissions' }];

export default function IndexPermission() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { permissions, filters } = usePage<{ permissions: PaginatedResponse<Permission>; filters: any }>().props;
    const permissionActions = usePermissionActions();

    const columns = useMemo(
        () =>
            createColumns({
                onEdit: permissionActions.handleEdit,
                onDelete: permissionActions.handleDelete,
            }),
        [permissionActions.handleEdit, permissionActions.handleDelete],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permission" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen Permission</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div></div>
                    <Button onClick={permissionActions.handleAdd} className="mt-2 sm:mt-0">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Permission
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <DataTable
                            columns={columns}
                            data={permissions.data}
                            pagination={{
                                current_page: permissions.current_page,
                                last_page: permissions.last_page,
                                per_page: permissions.per_page,
                                total: permissions.total,
                                from: permissions.from,
                                to: permissions.to,
                            }}
                            filters={filters}
                            onBulkDelete={permissionActions.handleBulkDelete}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
