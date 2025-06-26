import { Role } from '@/pages/roles/types/roles.types';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    roles: Role[];
    password?: string;
    password_confirmation?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type UserFormData = {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;

    [key: string]: string;
};

export interface UserProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
        next_page_url?: string;
        prev_page_url?: string;
    };
}
