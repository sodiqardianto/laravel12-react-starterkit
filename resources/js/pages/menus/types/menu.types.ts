import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { FormDataConvertible } from '@inertiajs/core';

export interface Menu {
    id: number;
    name: string;
    href: string;
    icon: string;
    parent_id: number | null;
    children?: Menu[];
    [key: string]: FormDataConvertible;
}

export type DragListeners = SyntheticListenerMap | undefined;

// export type Menu = {
//     id: number;
//     name: string;
//     href: string;
//     icon: string;
//     parent_id: number | null;
// };

export type MenuFormData = {
    name: string;
    href: string;
    icon: string;
    parent_id: string | null;
};
