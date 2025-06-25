import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { useModalStore } from '@/stores/modal-stores';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { PermissionForm } from '../form';
import { Permission } from '../types/permissions.types';

export function usePermissionActions() {
    const { openModal } = useModalStore();
    const { confirmDelete } = useDeleteConfirmation();

    const handleAdd = () => {
        openModal({
            title: 'Tambah Permission',
            description: 'Silahkan isi data di bawah ini untuk membuat permission baru',
            content: <PermissionForm />,
        });
    };

    const handleEdit = (permission: Permission) => {
        openModal({
            title: 'Edit Permission',
            description: 'Silahkan lengkapi data di bawah ini untuk mengedit permission',
            content: <PermissionForm permission={permission} />,
        });
    };

    const handleDelete = (permission: Permission) => {
        const description = `Apakah Anda yakin ingin menghapus permission "${permission.name}"?`;

        confirmDelete({
            title: 'Hapus Permission',
            description,
            confirmText: 'Hapus Permission',
            onConfirm: async () => {
                return new Promise<void>((resolve, reject) => {
                    router.delete(`/permissions/${permission.id}`, {
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
                                toast.success('Permission berhasil dihapus!');
                            }

                            router.reload({ only: ['permissions'] }); // refresh data permissions dari backend
                            resolve();
                        },
                        onError: (errors) => {
                            console.error('Delete error:', errors);

                            // Handle validation errors or other errors
                            const firstError = Object.values(errors)[0] as string;
                            toast.error(firstError || 'Gagal menghapus permission. Silakan coba lagi.');
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
                title: 'Hapus Banyak Permission',
                description: `Apakah Anda yakin ingin menghapus ${ids.length} permission terpilih?`,
                confirmText: 'Hapus Yang Dipilih',
                onConfirm: () => {
                    router.post(
                        route('permissions.bulk-delete'),
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
                                    toast.success('Permission berhasil dihapus!');
                                }

                                router.reload({ only: ['permissions'] });
                                resolve();
                            },
                            onError: (errors) => {
                                console.error('Bulk delete error:', errors);
                                const firstError = Object.values(errors)[0] as string;
                                toast.error(firstError || 'Gagal menghapus permission.');
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
