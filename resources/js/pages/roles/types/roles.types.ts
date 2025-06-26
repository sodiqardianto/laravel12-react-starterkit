export interface Role {
    id: number;
    name: string;
    permissions: {
        id: number;
        name: string;
    }[];
}

export interface RoleFormData {
    name: string;
    permissions: number[];

    [key: string]: string | number[];
}

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

export interface Permission {
    id: number;
    name: string;
}

export interface PermissionGroup {
    id: number;
    name: string;
    permissions: Permission[];
}
