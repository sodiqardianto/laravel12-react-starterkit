import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { useModalStore } from '@/stores/modal-stores';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { UserForm } from '../form';
import { User } from '../types/users.types';

export function useUserActions() {
    const { openModal } = useModalStore();
    const { confirmDelete } = useDeleteConfirmation();

    const handleAdd = () => {
        openModal({
            title: 'Tambah User',
            description: 'Silahkan isi data di bawah ini untuk membuat user baru',
            content: <UserForm />,
        });
    };

    const handleEdit = (user: User) => {
        openModal({
            title: 'Edit User',
            description: 'Silahkan lenkgapi data di bawah ini untuk mengedit user',
            content: <UserForm user={user} />,
        });
    };

    const handleDelete = (user: User) => {
        const description = `Apakah Anda yakin ingin menghapus user "${user.name}"?`;

        confirmDelete({
            title: 'Hapus User',
            description,
            confirmText: 'Hapus User',
            onConfirm: async () => {
                return new Promise<void>((resolve, reject) => {
                    router.delete(`/users/${user.id}`, {
                        onSuccess: () => {
                            toast.success('User berhasil dihapus!');
                            router.reload({ only: ['users'] }); // refresh data users dari backend
                            resolve();
                        },
                        onError: (errors) => {
                            console.error('Delete error:', errors);
                            toast.error('Gagal menghapus user. Silakan coba lagi.');
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
