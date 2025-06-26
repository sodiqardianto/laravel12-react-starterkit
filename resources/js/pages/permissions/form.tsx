import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { capitalizeWords } from '@/lib/utils';
import { useModalStore } from '@/stores/modal-stores';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { usePermissionForm } from './hooks/use-permission-form';
import { usePermissionSubmit } from './hooks/use-permission-submit';
import { Permission } from './types/permissions.types';

interface PermissionFormProps {
    permission?: Permission;
}

interface GroupOption {
    id: number;
    name: string;
}

export function PermissionForm({ permission }: PermissionFormProps) {
    const { props } = usePage<Partial<{ groups: GroupOption[] }>>();
    const groups = props.groups ?? [];

    const formMethods = usePermissionForm(permission);
    const { data, setData, processing, errors } = formMethods;

    const { submitForm } = usePermissionSubmit(permission);
    const { closeModal } = useModalStore();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitForm(formMethods);
    };

    const [createNewGroup, setCreateNewGroup] = useState(false);
    const [crud, setCrud] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">
                    Nama Permission <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder={crud ? 'Contoh: user' : 'Contoh: view_user, create_user, update_user, delete_user'}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            {crud && !createNewGroup && (
                <p className="mt-1 text-sm text-muted-foreground">
                    Nama yang dimasukkan akan digunakan untuk membuat permission:
                    <br />
                    <code>view_&lt;nama&gt;</code>, <code>create_&lt;nama&gt;</code>, <code>update_&lt;nama&gt;</code>,{' '}
                    <code>delete_&lt;nama&gt;</code>
                </p>
            )}

            {createNewGroup && (
                <div>
                    <Label htmlFor="group">
                        Nama Grup <span className="text-red-500">*</span>
                    </Label>
                    <Input id="group" value={data.group} onChange={(e) => setData('group', e.target.value)} placeholder="Masukan Nama Grup" />
                    {errors.group && <p className="text-sm text-red-500">{errors.group}</p>}
                </div>
            )}

            {!createNewGroup && (
                <div>
                    <Label htmlFor="href">
                        Group <span className="text-red-500">*</span>
                    </Label>
                    <Select value={data.group ? String(data.group) : ''} onValueChange={(value) => setData('group', '' + value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Group" />
                        </SelectTrigger>
                        <SelectContent>
                            {groups.map((group) => (
                                <SelectItem key={group.id} value={String(group.name)}>
                                    {capitalizeWords(group.name)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.group && <p className="text-sm text-red-500">{errors.group}</p>}
                </div>
            )}

            <div className="flex items-center space-x-5">
                {!createNewGroup && (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="create-crud"
                            checked={crud}
                            onCheckedChange={(checked) => {
                                const isChecked = Boolean(checked);
                                setData('crud', isChecked);
                                setCrud(isChecked);
                            }}
                        />
                        <Label htmlFor="create-crud">Buat CRUD</Label>
                    </div>
                )}
                {!crud && (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="create-new-group"
                            checked={createNewGroup}
                            onCheckedChange={(checked) => {
                                const isChecked = typeof checked === 'boolean' ? checked : !!checked;
                                setData('create_new_group', isChecked);
                                setCreateNewGroup(isChecked);
                                if (isChecked) setData('group', '');
                            }}
                        />
                        <Label htmlFor="create-new-group">Buat Group Baru</Label>
                    </div>
                )}
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
