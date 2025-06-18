import { useModalStore } from '@/stores/modal-stores';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { FORM_MESSAGES } from '../constants/form-messages';
import { MenuFormData } from '../types/form.types';
import { Menu } from '../types/menu.types';

export const useMenuSubmit = (menu?: Menu) => {
    const { closeModal } = useModalStore();

    const handleSuccess = (isUpdate: boolean) => {
        const message = isUpdate ? FORM_MESSAGES.SUCCESS_UPDATE : FORM_MESSAGES.SUCCESS_CREATE;
        return (toastId: string | number) => {
            toast.success(message, { id: toastId });
            closeModal();
        };
    };

    const handleError = (isUpdate: boolean) => {
        const message = isUpdate ? FORM_MESSAGES.ERROR_UPDATE : FORM_MESSAGES.ERROR_CREATE;
        return (toastId: string | number) => {
            toast.error(message, { id: toastId });
        };
    };

    const submitForm = (formMethods: ReturnType<typeof useForm<MenuFormData>>) => {
        const { post, put } = formMethods;
        const isUpdate = !!menu;
        const loadingMessage = isUpdate ? FORM_MESSAGES.SAVING_UPDATE : FORM_MESSAGES.SAVING_NEW;
        const toastId = toast.loading(loadingMessage);

        const submitOptions = {
            onSuccess: () => {
                handleSuccess(isUpdate)(toastId);
                router.reload({ only: ['menus'] });
            },
            onError: () => handleError(isUpdate)(toastId),
        };

        return isUpdate ? put(`/menus/${menu.id}`, submitOptions) : post('/menus', submitOptions);
    };

    return { submitForm };
};
