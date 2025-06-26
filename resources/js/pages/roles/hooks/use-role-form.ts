import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { Role, RoleFormData } from '../types/roles.types';

export const useRoleForm = (role?: Role) => {
    const initialData: RoleFormData = useMemo(
        () => ({
            name: role?.name ?? '',
            permissions: role?.permissions?.map((p) => p.id) ?? [],
        }),
        [role],
    );

    return useForm<RoleFormData>(initialData);
};
