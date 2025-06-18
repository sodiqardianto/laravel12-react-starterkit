'use client';

import { useDeleteConfirmationStore } from '@/stores/delete-confirmation-store';
import { useCallback } from 'react';
import { DeleteConfirmationDialog } from '../delete-confirmation-dialog';

export function DeleteConfirmationProvider() {
    const { isOpen, title, description, confirmText, cancelText, onConfirm, isLoading, closeDeleteConfirmation } = useDeleteConfirmationStore();

    const handleConfirm = useCallback(() => {
        if (onConfirm && !isLoading) {
            onConfirm();
        }
    }, [onConfirm, isLoading]);

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (!open && !isLoading) {
                closeDeleteConfirmation();
            }
        },
        [closeDeleteConfirmation, isLoading],
    );

    // Hanya render jika modal dalam state yang valid
    if (!isOpen && !description) {
        return null;
    }

    return (
        <DeleteConfirmationDialog
            open={isOpen}
            onOpenChange={handleOpenChange}
            title={title}
            description={description}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={handleConfirm}
            isLoading={isLoading}
        />
    );
}
