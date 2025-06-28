<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'dashboard',
                'href' => 'dashboard',
                'icon' => 'LayoutDashboard',
                'permission' => 'view_dashboard',
                'parent_id' => null,
                'order' => 0,
            ],
            [
                'name' => 'manajemen user',
                'href' => 'manajemen-user',
                'icon' => 'Users',
                'permission' => 'view_manajemen_user',
                'parent_id' => null,
                'order' => 1,
            ],
            [
                'name' => 'menu',
                'href' => 'menus',
                'icon' => null,
                'permission' => 'view_menus',
                'parent_id' => 2,
                'order' => 0,
            ],
            [
                'name' => 'users',
                'href' => 'users',
                'icon' => null,
                'permission' => 'view_users',
                'parent_id' => 2,
                'order' => 1,
            ],
            [
                'name' => 'role',
                'href' => 'roles',
                'icon' => null,
                'permission' => 'view_roles',
                'parent_id' => 2,
                'order' => 2,
            ],
            [
                'name' => 'permission',
                'href' => 'permissions',
                'icon' => null,
                'permission' => 'view_permissions',
                'parent_id' => 2,
                'order' => 3,
            ]
        ];
        foreach ($menus as $menu) {
            Menu::create($menu);
        }
    }
}
