import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useModalStore } from '@/stores/modal-stores';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { MenuForm } from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menu',
        href: '/menus',
    },
];

export default function IndexMenu() {
    const { openModal } = useModalStore();

    const handleAddClick = () => {
        openModal({
            title: 'Tambah Menu',
            description: 'Isi data menu baru',
            content: <MenuForm />,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Title */}
                <h1 className="text-2xl font-semibold tracking-tight">Manajemen Menu</h1>

                {/* Search & Tambah */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Input placeholder="Cari menu..." className="w-full sm:w-[300px]" />
                    <Button className="w-full sm:w-auto" onClick={handleAddClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Menu
                    </Button>
                </div>

                {/* Sortable Container */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            {/* Placeholder sortable */}
                            <div className="text-sm text-muted-foreground">Daftar menu akan ditampilkan di sini (sortable).</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
