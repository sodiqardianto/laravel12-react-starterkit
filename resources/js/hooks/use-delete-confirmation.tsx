import { useDeleteConfirmationStore } from '@/stores/delete-confirmation-store';

export function useDeleteConfirmation() {
    const { openDeleteConfirmation, closeDeleteConfirmation, setLoading, isLoading } = useDeleteConfirmationStore();

    const confirmDelete = (config: {
        title?: string;
        description: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => Promise<void> | void;
    }) => {
        openDeleteConfirmation({
            ...config,
            onConfirm: async () => {
                try {
                    setLoading(true);
                    await config.onConfirm();
                    closeDeleteConfirmation();
                } catch (error) {
                    setLoading(false);
                    // Error handling bisa ditambahkan di sini
                    console.error('Delete error:', error);
                }
            },
        });
    };

    return {
        confirmDelete,
        closeDeleteConfirmation,
        isLoading,
    };
}
