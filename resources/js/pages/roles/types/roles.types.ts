export interface Role {
    id: number;
    name: string;
}

export type RoleFormData = Pick<Role, 'name'>;

export interface RoleProps {
    roles: {
        data: Role[];
        current_page: number;
        last_page: number;
        total: number;
        next_page_url?: string;
        prev_page_url?: string;
    };
}
