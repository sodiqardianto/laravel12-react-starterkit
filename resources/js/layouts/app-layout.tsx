import { GlobalModal } from '@/components/global-modal';
import { DeleteConfirmationProvider } from '@/components/providers/delete-confirmation-provider';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <GlobalModal />
        <DeleteConfirmationProvider />
        <Toaster position="top-right" />
    </AppLayoutTemplate>
);
