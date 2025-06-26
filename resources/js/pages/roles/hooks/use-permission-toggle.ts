import { useState } from 'react';
import { PermissionGroup } from '../types/roles.types';

export const usePermissionToggle = (selectedIds: number[], setSelectedIds: (ids: number[]) => void, dataPermission: PermissionGroup[]) => {
    const [collapsedGroupIds, setCollapsedGroupIds] = useState<number[]>([]);

    const isChecked = (id: number) => selectedIds.includes(id);

    const toggle = (id: number) => {
        setSelectedIds(selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id]);
    };

    const toggleGroup = (group: PermissionGroup) => {
        const ids = group.permissions.map((p) => p.id);
        const allSelected = ids.every((id) => selectedIds.includes(id));

        setSelectedIds(allSelected ? selectedIds.filter((id) => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
    };

    const toggleAll = () => {
        const allIds = dataPermission.flatMap((g) => g.permissions.map((p) => p.id));
        const allSelected = allIds.every((id) => selectedIds.includes(id));

        setSelectedIds(allSelected ? [] : allIds);
    };

    const isGroupChecked = (group: PermissionGroup) => group.permissions.some((p) => isChecked(p.id));

    const isGroupFullyChecked = (group: PermissionGroup) => group.permissions.every((p) => isChecked(p.id));

    const toggleCollapse = (groupId: number) => {
        setCollapsedGroupIds((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]));
    };

    const isCollapsed = (groupId: number) => collapsedGroupIds.includes(groupId);

    return {
        isChecked,
        toggle,
        toggleGroup,
        toggleAll,
        isGroupChecked,
        isGroupFullyChecked,
        toggleCollapse,
        isCollapsed,
    };
};
