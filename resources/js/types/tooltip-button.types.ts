import { ReactNode } from 'react';

export interface TooltipButtonProps {
    children: ReactNode;
    tooltip: string;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    title?: string;
    variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}
