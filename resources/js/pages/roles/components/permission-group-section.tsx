import { Checkbox } from '@/components/ui/checkbox';
import { Permission, PermissionGroup } from '../types/roles.types';
import IndeterminateCheckbox from './indeterminate-checkbox';

interface Props {
    group: PermissionGroup;
    isCollapsed: boolean;
    onToggleCollapse: (groupId: number) => void;
    isChecked: (id: number) => boolean;
    isGroupChecked: (group: PermissionGroup) => boolean;
    isGroupFullyChecked: (group: PermissionGroup) => boolean;
    toggle: (id: number) => void;
    toggleGroup: (group: PermissionGroup) => void;
}

export default function PermissionGroupSection({
    group,
    isCollapsed,
    onToggleCollapse,
    isChecked,
    isGroupChecked,
    isGroupFullyChecked,
    toggle,
    toggleGroup,
}: Props) {
    return (
        <div className="space-y-2 border-l border-border pl-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <IndeterminateCheckbox
                        checked={isGroupChecked(group)}
                        indeterminate={isGroupChecked(group) && !isGroupFullyChecked(group)}
                        onCheckedChange={() => toggleGroup(group)}
                    />
                    <span className="text-sm font-medium">{group.name}</span>
                </div>
                <button
                    type="button"
                    onClick={() => onToggleCollapse(group.id)}
                    className="cursor-pointer text-sm text-muted-foreground hover:underline"
                >
                    {isCollapsed ? 'Tampilkan' : 'Sembunyikan'}
                </button>
            </div>

            {!isCollapsed && (
                <div className="ml-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.permissions.map((permission: Permission) => (
                        <label key={permission.id} className="flex items-center space-x-2 text-sm">
                            <Checkbox checked={isChecked(permission.id)} onCheckedChange={() => toggle(permission.id)} />
                            <span>{permission.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
