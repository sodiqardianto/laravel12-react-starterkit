<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Permission::whereIn('id', $ids)->delete();

        return back()->with('success', 'Berhasil menghapus data terpilih.');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $groups = PermissionGroup::with('permissions')->get();
        $permissions = Permission::query();

        if ($search = $request->query('search')) {
            $permissions->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('group', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $permissions->with('group');
        $permissions->orderBy('id', 'desc');

        $perPage = $request->query('per_page', 10);
        $permissions = $permissions->paginate($perPage)->withQueryString();

        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
            'groups' => $groups,
            'filters' => $request->only('search', 'per_page'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $isCreatingGroup = $request->boolean('create_new_group');
        $isCrud = $request->boolean('crud');

        if ($isCreatingGroup) {
            $request->validate([
                'name' => 'required|string|min:3|max:255|unique:permissions,name',
                'group' => 'required|min:3|unique:permission_groups,name',
                'crud' => 'nullable|boolean',
                'create_new_group' => 'nullable|boolean',
            ], [
                'name.required' => 'Nama harus diisi.',
                'name.min' => 'Nama minimal 3 karakter.',
                'name.unique' => 'Permission sudah terdaftar.',
                'group.required' => 'Grup harus diisi.',
                'group.unique' => 'Grup sudah terdaftar.',
                'group.min' => 'Grup minimal 3 karakter.',
            ]);
        } else {
            $request->validate([
                'name' => 'required|string|min:3|max:255|unique:permissions,name',
                'group' => 'required',
                'crud' => 'nullable|boolean',
                'create_new_group' => 'nullable|boolean',
            ], [
                'name.required' => 'Nama harus diisi.',
                'name.min' => 'Nama minimal 3 karakter.',
                'name.unique' => 'Permission sudah terdaftar.',
                'group.required' => 'Grup harus dipilih.',
            ]);
        }

        if ($isCrud) {
            $group = PermissionGroup::firstOrCreate(['name' => $request->group]);
            $groupId = $group->id;

            $baseName = Str::slug($request->name, '_');

            $crudActions = ['view', 'create', 'update', 'delete'];

            foreach ($crudActions as $action) {
                Permission::firstOrCreate([
                    'name' => "{$action}_{$baseName}",
                    'group_id' => $groupId,
                ]);
            }

            return back()->with('success', 'Permission CRUD berhasil dibuat.');
        }

        $groupId = PermissionGroup::firstOrCreate(['name' => $request->group]);
        

        Permission::firstOrCreate([
            'name' => $request->name,
            'group_id' => $groupId->id,
        ]);

        return back()->with('success', 'Permission berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|min:3|max:255|unique:permissions,name,' . $id,
        ]);

        Permission::find($id)->update([
            'name' => $request->name,
        ]);

        return back()->with([
            'success' => 'Permission berhasil diperbarui.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id)
    {
        return DB::transaction(function () use ($id) {
            $permission = Permission::findOrFail($id);

            if ($permission->name === 'Super Admin') {
                return back()->with([
                    'error' => 'Permission Super Admin tidak dapat dihapus.',
                ]);
            }

            if ($permission->roles()->exists() || $permission->users()->exists()) {
                return back()->with([
                    'error' => 'Permission sedang digunakan dan tidak dapat dihapus.',
                ]);
            }

            $groupId = $permission->group_id;

            // Hapus permission (soft delete)
            $permission->delete();

            // Cek apakah tidak ada permission lain di grup (yang tidak soft deleted)
            $hasRemaining = Permission::where('group_id', $groupId)
                ->whereNull('deleted_at')
                ->exists();

            if ($groupId && !$hasRemaining) {
                PermissionGroup::where('id', $groupId)->delete(); // soft delete
            }

            return back()->with([
                'success' => 'Permission berhasil dihapus.',
            ]);
        });
    }
}
