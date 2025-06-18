import { Menu } from './menu.types';

export type MenuFormData = {
    name: string;
    href: string;
    icon: string;
    parent_id: string | null;
};

export interface MenuFormProps {
    menu?: Menu;
}

export interface FormFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    value?: string;
    setData: (field: string, value: string) => void;
}
