import { usePage } from '@inertiajs/react';

/**
 * Hook untuk mengecek permission user yang sedang login.
 * @param permissionName Nama permission yang ingin dicek (misal: 'create_users')
 * @returns boolean
 */
export function usePermission(permissionName: string): boolean {
    const {
        auth: {
            user: { permissions = [] },
        },
    } = usePage<{
        auth: {
            user: {
                permissions: string[];
            };
        };
    }>().props;

    return permissions.includes(permissionName);
}
