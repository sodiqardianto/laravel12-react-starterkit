import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { UserFormData } from '../types/fom.type';
import { User } from '../types/users.types';

export const useUserForm = (user?: User) => {
    const initialData: UserFormData = useMemo(
        () => ({
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: user?.password ?? '',
            password_confirmation: user?.password_confirmation ?? '',
        }),
        [user],
    );

    return useForm<UserFormData>(initialData);
};
