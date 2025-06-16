import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { capitalizeWords } from '@/lib/utils';
import { useModalStore } from '@/stores/modal-stores';
import { useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

type Menu = {
    id: number;
    name: string;
};

export function MenuForm() {
    const { props } = usePage<Partial<{ menus: Menu[] }>>();
    const menus = props.menus ?? [];

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        href: string;
        icons: string;
        parent_id: string | null;
    }>({
        name: '',
        href: '',
        icons: '',
        parent_id: null,
    });

    const closeModal = useModalStore((state) => state.closeModal);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Menyimpan menu...');
        post('/menus', {
            onSuccess: () => {
                toast.success('Menu berhasil ditambahkan', { id: toastId });
                closeModal();
            },
            onError: () => {
                toast.error('Gagal menambahkan menu', { id: toastId });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">
                    Nama Menu <span className="text-red-500">*</span>
                </Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Masukan Nama Menu" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
                <Label htmlFor="href">
                    URL <span className="text-red-500">*</span>
                </Label>
                <Input id="href" value={data.href} onChange={(e) => setData('href', e.target.value)} placeholder="Masukan URL Route" />
                {errors.href && <p className="text-sm text-red-500">{errors.href}</p>}
            </div>
            <div>
                <Label htmlFor="icons">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="inline-flex cursor-pointer items-center gap-1">
                                Ikon (Optional) <CircleAlert size={13} />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ikon yang digunakan untuk harus menggunakan{' '}
                            <a
                                href="https://lucide.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 italic underline dark:text-blue-400"
                            >
                                Lucide{' '}
                            </a>
                            ikon
                        </TooltipContent>
                    </Tooltip>
                </Label>
                <Input id="icons" value={data.icons} onChange={(e) => setData('icons', e.target.value)} placeholder="Masukan Ikon dari Lucide Ikon" />
                {errors.icons && <p className="text-sm text-red-500">{errors.icons}</p>}
            </div>
            <div>
                <Label htmlFor="href">
                    Parent Menu <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={data.parent_id ? String(data.parent_id) : 'null'}
                    onValueChange={(value) => setData('parent_id', value === 'null' ? null : value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih parent menu (boleh dikosongkan)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="null">Tanpa Parent</SelectItem>
                        {menus.map((menu) => (
                            <SelectItem key={menu.id} value={String(menu.id)}>
                                {capitalizeWords(menu.name)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}
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
