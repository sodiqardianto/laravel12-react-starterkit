import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { useModalStore } from '@/stores/modal-stores';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { RoleForm } from '../form';
import { Role } from '../types/roles.types';

export function useRoleActions() {
    const { openModal } = useModalStore();
    const { confirmDelete } = useDeleteConfirmation();

    const handleAdd = () => {
        openModal({
            title: 'Tambah Role',
            description: 'Silahkan isi data di bawah ini untuk membuat role baru',
            content: <RoleForm />,
        });
    };

    const handleEdit = (role: Role) => {
        openModal({
            title: 'Edit Role',
            description: 'Silahkan lengkapi data di bawah ini untuk mengedit role',
            content: <RoleForm role={role} />,
        });
    };

    const handleDelete = (role: Role) => {
        const description = `Apakah Anda yakin ingin menghapus role "${role.name}"?`;

        confirmDelete({
            title: 'Hapus Role',
            description,
            confirmText: 'Hapus Role',
            onConfirm: async () => {
                return new Promise<void>((resolve, reject) => {
                    router.delete(`/roles/${role.id}`, {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSuccess: (page: any) => {
                            // Access flash data from the response page props
                            const flashSuccess = page.props.flash?.success;
                            const flashError = page.props.flash?.error;

                            if (flashSuccess) {
                                toast.success(flashSuccess);
                            } else if (flashError) {
                                toast.error(flashError);
                                reject(new Error(flashError));
                                return;
                            } else {
                                toast.success('Role berhasil dihapus!');
                            }

                            router.reload({ only: ['roles'] }); // refresh data roles dari backend
                            resolve();
                        },
                        onError: (errors) => {
                            console.error('Delete error:', errors);

                            // Handle validation errors or other errors
                            const firstError = Object.values(errors)[0] as string;
                            toast.error(firstError || 'Gagal menghapus role. Silakan coba lagi.');
                            reject(errors);
                        },
                    });
                });
            },
        });
    };

    return {
        handleAdd,
        handleEdit,
        handleDelete,
    };
}
