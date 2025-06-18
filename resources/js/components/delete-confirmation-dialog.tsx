import { AlertTriangle } from 'lucide-react';
import { memo } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';

interface DeleteConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const DeleteConfirmationDialog = memo(function DeleteConfirmationDialog({
    open,
    onOpenChange,
    title = 'Konfirmasi Hapus',
    description,
    confirmText = 'Hapus',
    cancelText = 'Batal',
    onConfirm,
    isLoading = false,
}: DeleteConfirmationDialogProps) {
    // Jangan render jika tidak ada description (mencegah flash)
    if (!description && !open) return null;

    const handleOpenChange = (newOpen: boolean) => {
        if (!isLoading) {
            onOpenChange(newOpen);
        }
    };

    const handleConfirm = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isLoading) {
            onConfirm();
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <AlertDialogTitle className="text-left text-lg font-semibold">{title}</AlertDialogTitle>
                            <AlertDialogDescription className="text-left text-sm text-muted-foreground">{description}</AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                    <AlertDialogCancel disabled={isLoading} className="order-2 sm:order-1">
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="order-1 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 sm:order-2"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Menghapus...
                            </div>
                        ) : (
                            confirmText
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});
