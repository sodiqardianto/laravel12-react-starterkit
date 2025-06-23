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
import { useRoleActions } from './hooks/use-role-actions';
import { Role } from './types/roles.types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Role', href: '/roles' }];

export default function IndexRole() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { roles, filters } = usePage<{ roles: PaginatedResponse<Role>; filters: any }>().props;
    const roleActions = useRoleActions();

    const columns = useMemo(
        () =>
            createColumns({
                onEdit: roleActions.handleEdit,
                onDelete: roleActions.handleDelete,
            }),
        [roleActions.handleEdit, roleActions.handleDelete],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen Role</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div></div>
                    <Button onClick={roleActions.handleAdd} className="mt-2 sm:mt-0">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Role
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <DataTable
                            columns={columns}
                            data={roles.data}
                            pagination={{
                                current_page: roles.current_page,
                                last_page: roles.last_page,
                                per_page: roles.per_page,
                                total: roles.total,
                                from: roles.from,
                                to: roles.to,
                            }}
                            filters={filters}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
