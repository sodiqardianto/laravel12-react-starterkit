import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { User, UserFormData } from '../types/users.types';

export const useUserForm = (user?: User) => {
    const initialData: UserFormData = useMemo(
        () => ({
            name: user?.name ?? '',
            email: user?.email ?? '',
            role: user?.roles?.[0]?.name ?? '',
            password: user?.password ?? '',
            password_confirmation: user?.password_confirmation ?? '',
        }),
        [user],
    );

    return useForm<UserFormData>(initialData);
};
