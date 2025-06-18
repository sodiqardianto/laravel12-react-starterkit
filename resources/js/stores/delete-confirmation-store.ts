import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface DeleteConfirmationState {
    isOpen: boolean;
    title?: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: (() => void) | null;
    isLoading: boolean;
}

interface DeleteConfirmationActions {
    openDeleteConfirmation: (config: {
        title?: string;
        description: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
    }) => void;
    closeDeleteConfirmation: () => void;
    setLoading: (loading: boolean) => void;
    reset: () => void;
}

const initialState: DeleteConfirmationState = {
    isOpen: false,
    title: undefined,
    description: '',
    confirmText: undefined,
    cancelText: undefined,
    onConfirm: null,
    isLoading: false,
};

export const useDeleteConfirmationStore = create<DeleteConfirmationState & DeleteConfirmationActions>()(
    subscribeWithSelector((set) => ({
        ...initialState,

        openDeleteConfirmation: (config) => {
            // Pastikan state ter-reset sebelum membuka dialog baru
            set({
                ...initialState,
                isOpen: true,
                title: config.title,
                description: config.description,
                confirmText: config.confirmText,
                cancelText: config.cancelText,
                onConfirm: config.onConfirm,
            });
        },

        closeDeleteConfirmation: () => {
            set((state) => ({
                ...state,
                isOpen: false,
            }));

            // Reset state setelah animasi selesai
            setTimeout(() => {
                set(initialState);
            }, 200);
        },

        setLoading: (loading) => {
            set({ isLoading: loading });
        },

        reset: () => {
            set(initialState);
        },
    })),
);
