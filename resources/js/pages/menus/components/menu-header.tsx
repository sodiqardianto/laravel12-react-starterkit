import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface MenuHeaderProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddClick: () => void;
}

export function MenuHeader({ searchTerm, onSearchChange, onAddClick }: MenuHeaderProps) {
    return (
        <>
            <h1 className="text-2xl font-semibold tracking-tight">Manajemen Menu</h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Input placeholder="Cari menu..." className="w-full sm:w-[300px]" value={searchTerm} onChange={onSearchChange} />
                <Button onClick={onAddClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Menu
                </Button>
            </div>
        </>
    );
}
