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
                                toast.success('User berhasil dihapus!');
                            }

                            router.reload({ only: ['users'] });
                            resolve();
                        },
                        onError: (errors) => {
                            console.error('Delete error:', errors);

                            // Handle validation errors or other errors
                            const firstError = Object.values(errors)[0] as string;
                            toast.error(firstError || 'Gagal menghapus user. Silakan coba lagi.');
                            reject(errors);
                        },
                    });
                });
            },
        });
    };

    const handleBulkDelete = async (ids: number[]) => {
        return new Promise<void>((resolve, reject) => {
            confirmDelete({
                title: 'Hapus Banyak User',
                description: `Apakah Anda yakin ingin menghapus ${ids.length} user terpilih?`,
                confirmText: 'Hapus Yang Dipilih',
                onConfirm: () => {
                    router.post(
                        route('users.bulk-delete'),
                        { ids },
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onSuccess: (page: any) => {
                                const flashSuccess = page.props.flash?.success;
                                const flashError = page.props.flash?.error;

                                if (flashSuccess) {
                                    toast.success(flashSuccess);
                                } else if (flashError) {
                                    toast.error(flashError);
                                    reject(new Error(flashError));
                                    return;
                                } else {
                                    toast.success('User berhasil dihapus!');
                                }

                                router.reload({ only: ['users'] });
                                resolve();
                            },
                            onError: (errors) => {
                                console.error('Bulk delete error:', errors);
                                const firstError = Object.values(errors)[0] as string;
                                toast.error(firstError || 'Gagal menghapus user.');
                                reject(errors);
                            },
                        },
                    );
                },
            });
        });
    };

    return {
        handleAdd,
        handleEdit,
        handleDelete,
        handleBulkDelete,
    };
}
