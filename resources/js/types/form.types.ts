export interface FormFieldProps {
    type: 'text' | 'email' | 'password' | 'number';
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    value?: string;
    setData: (field: string, value: string) => void;
}

export interface SelectItemType {
    id: number | string;
    name: string;
}

export interface InputSelectFormProps<T extends SelectItemType> {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    listOfValues: T[];
}
