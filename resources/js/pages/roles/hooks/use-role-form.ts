import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { Role, RoleFormData } from '../types/roles.types';

export const useRoleForm = (role?: Role) => {
    const initialData: RoleFormData = useMemo(
        () => ({
            name: role?.name ?? '',
        }),
        [role],
    );

    return useForm<RoleFormData>(initialData);
};
