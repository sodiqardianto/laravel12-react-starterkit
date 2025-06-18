import * as LucideIcons from 'lucide-react';
import { Circle, LucideIcon } from 'lucide-react';

export const DynamicIcon = ({ name }: { name: string }) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcon | undefined;
    if (!Icon) return <Circle className="mr-2 h-4 w-4" />;
    return <Icon className="mr-2 h-4 w-4" />;
};
