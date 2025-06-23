import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/stores/modal-stores';
import { FormEvent } from 'react';
import { useRoleForm } from './hooks/use-role-form';
import { useRoleSubmit } from './hooks/use-role-submit';
import { Role } from './types/roles.types';

export function RoleForm({ role }: { role?: Role }) {
    const formMethods = useRoleForm(role);
    const { data, setData, processing, errors } = formMethods;

    const { submitForm } = useRoleSubmit(role);
    const { closeModal } = useModalStore();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitForm(formMethods);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">
                    Nama <span className="text-red-500">*</span>
                </Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Masukan Nama Role" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
