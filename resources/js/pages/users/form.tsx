import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/stores/modal-stores';
// import { usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { capitalizeWords } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Role } from '../roles/types/roles.types';
import { useUserForm } from './hooks/use-user-form';
import { useUserSubmit } from './hooks/use-user-submit';
import { User } from './types/users.types';

export function UserForm({ user }: { user?: User }) {
    const { props } = usePage<Partial<{ roles: Role[] }>>();
    const roles = props.roles ?? [];

    const formMethods = useUserForm(user);
    const { data, setData, processing, errors } = formMethods;

    const { submitForm } = useUserSubmit(user);
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
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Masukan Nama User" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
                <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Masukan Email" />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
                <Label htmlFor="role">
                    Role <span className="text-red-500">*</span>
                </Label>
                <Select value={data.role ? String(data.role) : ''} onValueChange={(value) => setData('role', '' + value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={String(role.name)}>
                                {capitalizeWords(role.name)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>

            {!user && (
                <>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukan Password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Masukan Konfirmasi Password"
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                    </div>
                </>
            )}

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
