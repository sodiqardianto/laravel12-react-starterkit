<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\PermissionGroup;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionGroups = [
            [
                'name' => 'dashboard',
            ],
            [
                'name' => 'manajemen user',
            ],
        ];
        foreach ($permissionGroups as $permissionGroup) {
            PermissionGroup::firstOrCreate($permissionGroup);
        }
        
        $modules = [
            'menus',
            'users',
            'roles',
            'permissions',
        ];
        
        $permissions = [];
        
        // CRUD PERMISSION
        foreach ($modules as $module) {
            foreach (['create', 'view', 'edit', 'delete'] as $action) {
                $permissions[] = "{$action}_{$module}";
            }
        }

        // CUSTOM PERMISSION
        $permissions = array_merge($permissions, [
            'sort_menus',
        ]);

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'group_id' => PermissionGroup::where('name', 'manajemen user')->first()->id,
            ]);
        }

        // DASHBOARD PERMISSION
        $permissions = [
            'view_dashboard',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'group_id' => PermissionGroup::where('name', 'dashboard')->first()->id,
            ]);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdmin->givePermissionTo(Permission::all());

        $user = Role::firstOrCreate(['name' => 'User']);
        $user->syncPermissions([
            'view_dashboard',
            'view_users',
        ]);
    }
}
