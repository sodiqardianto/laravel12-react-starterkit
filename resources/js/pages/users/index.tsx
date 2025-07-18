/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePermission } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { createColumns } from './components/columns';
import { useUserActions } from './hooks/use-user-actions';
import { PaginatedResponse } from './types/pagination.types';
import { User } from './types/users.types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'User', href: '/users' }];

export default function IndexUser() {
    const { users, filters } = usePage<{ users: PaginatedResponse<User>; filters: any }>().props;
    const userActions = useUserActions();
    const canCreate = usePermission('create_users');
    const canEdit = usePermission('edit_users');
    const canDelete = usePermission('delete_users');

    const columns = useMemo(
        () =>
            createColumns({
                canEdit,
                canDelete,
                onEdit: userActions.handleEdit,
                onDelete: userActions.handleDelete,
            }),
        [userActions.handleEdit, userActions.handleDelete, canEdit, canDelete],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen User</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div></div>
                    {canCreate && (
                        <Button onClick={userActions.handleAdd} className="mt-2 sm:mt-0">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah User
                        </Button>
                    )}
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <DataTable
                            columns={columns}
                            data={users.data}
                            pagination={{
                                current_page: users.current_page,
                                last_page: users.last_page,
                                per_page: users.per_page,
                                total: users.total,
                                from: users.from,
                                to: users.to,
                            }}
                            filters={filters}
                            onBulkDelete={userActions.handleBulkDelete}
                            canDelete={canDelete}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
