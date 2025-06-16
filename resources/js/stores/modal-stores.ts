import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    title?: string;
    description?: string;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    openModal: (params: { title?: string; description?: string; content: React.ReactNode; footer?: React.ReactNode }) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    title: '',
    description: '',
    content: null,
    footer: null,
    openModal: ({ title, description, content, footer }) => set({ isOpen: true, title, description, content, footer }),
    closeModal: () => set({ isOpen: false }),
}));
