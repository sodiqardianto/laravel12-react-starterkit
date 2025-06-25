export interface Permission {
    id: number;
    name: string;
    group: string;
    group_id: number;
    create_new_group: boolean;
    crud: boolean;
}

export interface PermissionFormData {
    name: string;
    group: string;
    create_new_group: boolean;
    crud: boolean;
    group_id: number;

    [key: string]: string | boolean | number;
}

export interface PermissionProps {
    permissions: {
        data: Permission[];
        current_page: number;
        last_page: number;
        total: number;
        next_page_url?: string;
        prev_page_url?: string;
    };
}
