/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalStore } from '@/stores/modal-stores';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Role, RoleFormData } from '../types/roles.types';

export const useRoleSubmit = (role?: Role) => {
    const { closeModal } = useModalStore();

    const submitForm = (formMethods: ReturnType<typeof useForm<RoleFormData>>) => {
        const { post, put } = formMethods;
        const isUpdate = !!role;
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

                router.reload({ only: ['roles'] });
            },
            onError: (errors: any) => {
                // Handle validation errors
                const firstError = Object.values(errors)[0] as string;
                toast.error(firstError || 'Terjadi kesalahan', { id: toastId });
            },
        };

        return isUpdate ? put(`/roles/${role.id}`, submitOptions) : post('/roles', submitOptions);
    };

    return { submitForm };
};
