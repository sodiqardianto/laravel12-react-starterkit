import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { MenuHeader } from './components/menu-header';
import { MenuList } from './components/menu-list';
import { useMenuActions } from './hooks/use-menu-actions';
import { useMenuSearch } from './hooks/use-menu-search';
import { Menu } from './types/menu.types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Menu', href: '/menus' }];

export default function IndexMenu() {
    const defaultMenus = usePage<SharedData>().props.menus as Menu[];
    const [menus, setMenus] = useState<Menu[]>(defaultMenus);

    useEffect(() => {
        setMenus(defaultMenus);
    }, [defaultMenus]);

    const { searchTerm, filteredMenus, handleSearchChange } = useMenuSearch(menus);
    const menuActions = useMenuActions(setMenus);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <MenuHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} onAddClick={menuActions.handleAdd} />
                <MenuList menus={filteredMenus} setMenus={setMenus} actions={menuActions} />
            </div>
        </AppLayout>
    );
}
