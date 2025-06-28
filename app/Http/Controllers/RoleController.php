<?php

namespace App\Http\Controllers;

use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Role::whereIn('id', $ids)->delete();

        return back()->with('success', 'Berhasil menghapus data terpilih.');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissions = PermissionGroup::with('permissions')->get();
        $roles = Role::with('permissions');

        if ($search = $request->query('search')) {
            $roles->where('name', 'like', "%$search%");
        }

        $roles->orderBy('id', 'desc');

        $perPage = $request->query('per_page', 10);
        $roles = $roles->paginate($perPage)->withQueryString();

        return Inertia::render('roles/index', [
            'roles' => $roles,
            'filters' => $request->only('search', 'per_page'),
            'permissions' => $permissions
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
        $request->validate([
            'name' => 'required|string|unique:roles|min:3|max:255',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ], [
            'name.required' => 'Nama harus diisi.',
            'name.min' => 'Nama minimal 3 karakter.',
            'name.unique' => 'Role sudah terdaftar.',
            'permissions.required' => 'Minimal satu permission harus dipilih.',
            'permissions.*.exists' => 'Permission tidak ditemukan.',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        $role->syncPermissions($request->permissions);

         return back()->with([
            'success' => 'Role berhasil dibuat.',
        ]);
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
            'name' => 'required|string|min:3|max:255|unique:roles,name,' . $id,
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ], [
            'name.required' => 'Nama harus diisi.',
            'name.min' => 'Nama minimal 3 karakter.',
            'name.unique' => 'Role sudah terdaftar.',
            'permissions.required' => 'Minimal satu permission harus dipilih.',
            'permissions.*.exists' => 'Permission tidak ditemukan.',
        ]);

        $role = Role::findOrFail($id);

        $role->update([
            'name' => $request->name,
        ]);

        $role->syncPermissions($request->permissions);

        return back()->with([
            'success' => 'Role berhasil diperbarui.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);

        if ($role->name === 'Super Admin') {
            return back()->with([
                'error' => 'Role Super Admin tidak dapat dihapus.',
            ]);
        }
        
        $role->delete();
        
        return back()->with([
            'success' => 'Role berhasil dihapus.',
        ]);
    }
}
