import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { Permission, PermissionFormData } from '../types/permissions.types';

export const usePermissionForm = (permission?: Permission) => {
    const initialData: PermissionFormData = useMemo(
        () => ({
            name: permission?.name ?? '',
            group: permission?.group ?? '',
            create_new_group: false,
            crud: false,
            group_id: permission?.group_id ?? 0,
        }),
        [permission],
    );

    return useForm<PermissionFormData>(initialData);
};
