import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/stores/modal-stores';
import { usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import PermissionGroupSection from './components/permission-group-section';
import { usePermissionToggle } from './hooks/use-permission-toggle';
import { useRoleForm } from './hooks/use-role-form';
import { useRoleSubmit } from './hooks/use-role-submit';
import { Role } from './types/roles.types';

interface Permission {
    id: number;
    name: string;
}

interface PermissionGroup {
    id: number;
    name: string;
    permissions: Permission[];
}

export function RoleForm({ role }: { role?: Role }) {
    const { props } = usePage<Partial<{ permissions: PermissionGroup[] }>>();
    const dataPermission: PermissionGroup[] = props.permissions ?? [];

    const formMethods = useRoleForm(role);
    const { data, setData, processing, errors } = formMethods;

    const { submitForm } = useRoleSubmit(role);
    const { closeModal } = useModalStore();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitForm(formMethods);
    };

    const { isChecked, toggle, toggleGroup, toggleAll, isGroupChecked, isGroupFullyChecked, toggleCollapse, isCollapsed } = usePermissionToggle(
        data.permissions,
        (val) => setData('permissions', val),
        dataPermission,
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="name">
                    Nama Role <span className="text-red-500">*</span>
                </Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Masukkan Nama Role" />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
                <Label>
                    Permissions <span className="text-red-500">*</span>
                </Label>

                <div className="mt-2 space-y-4 rounded-md border bg-muted/30 p-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="select-all"
                            checked={dataPermission.every((g) => g.permissions.every((p) => isChecked(p.id)))}
                            onCheckedChange={toggleAll}
                        />
                        <Label htmlFor="select-all" className="font-semibold">
                            Select All
                        </Label>
                    </div>

                    <div className="space-y-4">
                        {dataPermission.map((group) => (
                            <PermissionGroupSection
                                key={group.id}
                                group={group}
                                isCollapsed={isCollapsed(group.id)}
                                onToggleCollapse={toggleCollapse}
                                isChecked={isChecked}
                                isGroupChecked={isGroupChecked}
                                isGroupFullyChecked={isGroupFullyChecked}
                                toggle={toggle}
                                toggleGroup={toggleGroup}
                            />
                        ))}
                    </div>
                </div>

                {errors.permissions && <p className="mt-2 text-sm text-red-500">{errors.permissions}</p>}
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={closeModal}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    Simpan
                </Button>
            </div>
        </form>
    );
}
