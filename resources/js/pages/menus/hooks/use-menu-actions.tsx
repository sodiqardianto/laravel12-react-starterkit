import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { useModalStore } from '@/stores/modal-stores';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { MenuForm } from '../form';
import { Menu } from '../types/menu.types';

export function useMenuActions(setMenus: Dispatch<SetStateAction<Menu[]>>) {
    const { openModal } = useModalStore();
    const { confirmDelete } = useDeleteConfirmation();

    const handleAdd = () => {
        openModal({
            title: 'Tambah Menu',
            description: 'Silahkan isi data di bawah ini untuk membuat menu baru',
            content: <MenuForm />,
        });
    };

    const handleEdit = (menu: Menu) => {
        openModal({
            title: 'Edit Menu',
            description: 'Silahkan isi data di bawah ini untuk mengedit menu',
            content: <MenuForm menu={menu} />,
        });
    };

    const handleDelete = (menu: Menu) => {
        const hasChildren = menu.children && menu.children.length > 0;
        const description = hasChildren
            ? `Apakah Anda yakin ingin menghapus menu "${menu.name}"? Menu ini memiliki ${menu.children?.length} submenu yang juga akan terhapus.`
            : `Apakah Anda yakin ingin menghapus menu "${menu.name}"?`;

        confirmDelete({
            title: 'Hapus Menu',
            description,
            confirmText: 'Hapus Menu',
            onConfirm: async () => {
                return new Promise<void>((resolve, reject) => {
                    router.delete(`/menus/${menu.id}`, {
                        onSuccess: () => {
                            toast.success('Menu berhasil dihapus!');
                            setMenus((prevMenus) => prevMenus.filter((m) => m.id !== menu.id));
                            resolve();
                        },
                        onError: (errors) => {
                            console.error('Delete error:', errors);
                            toast.error('Gagal menghapus menu. Silakan coba lagi.');
                            reject(errors);
                        },
                    });
                });
            },
        });
    };

    const handleSubmenuDelete = (submenu: Menu, parentMenuId: number) => {
        if (confirm(`Apakah Anda yakin ingin menghapus submenu "${submenu.name}"?`)) {
            router.delete(`/menus/${submenu.id}`, {
                onSuccess: () => {
                    toast.success('Submenu berhasil dihapus!');
                    setMenus((prevMenus) =>
                        prevMenus.map((menu) => {
                            if (menu.id === parentMenuId && menu.children) {
                                return {
                                    ...menu,
                                    children: menu.children.filter((child) => child.id !== submenu.id),
                                };
                            }
                            return menu;
                        }),
                    );
                },
                onError: (errors) => {
                    console.error('Delete submenu error:', errors);
                    toast.error('Gagal menghapus submenu. Silakan coba lagi.');
                },
            });
        }
    };

    return {
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmenuDelete,
    };
}
