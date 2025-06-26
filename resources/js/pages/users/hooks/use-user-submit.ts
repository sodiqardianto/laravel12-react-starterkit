/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalStore } from '@/stores/modal-stores';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { User, UserFormData } from '../types/users.types';

export const useUserSubmit = (user?: User) => {
    const { closeModal } = useModalStore();

    const submitForm = (formMethods: ReturnType<typeof useForm<UserFormData>>) => {
        const { post, put } = formMethods;
        const isUpdate = !!user;
        const loadingMessage = isUpdate ? 'Menyimpan perubahan...' : 'Menyimpan data...';
        const toastId = toast.loading(loadingMessage);

        const submitOptions = {
            onSuccess: (page: any) => {
                const flashSuccess = page.props.flash?.success;
                const flashError = page.props.flash?.error;

                if (flashSuccess) {
                    toast.success(flashSuccess, { id: toastId });
                    closeModal();
                } else if (flashError) {
                    toast.error(flashError, { id: toastId });
                }

                router.reload({ only: ['users'] });
            },
            onError: (errors: any) => {
                const firstError = Object.values(errors)[0] as string;
                toast.error(firstError || 'Terjadi kesalahan', { id: toastId });
            },
        };

        return isUpdate ? put(`/users/${user.id}`, submitOptions) : post('/users', submitOptions);
    };

    return { submitForm };
};
