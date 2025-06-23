<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Role::query();

        if ($search = $request->query('search')) {
            $roles->where('name', 'like', "%$search%");
        }

        $roles->orderBy('id', 'desc');

        $perPage = $request->query('per_page', 10);
        $roles = $roles->paginate($perPage)->withQueryString();

        return Inertia::render('roles/index', [
            'roles' => $roles,
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
        $request->validate([
            'name' => 'required|string|unique:roles|min:3|max:255',
        ], [
            'name.required' => 'Nama harus diisi.',
            'name.min' => 'Nama minimal 3 karakter.',
            'name.unique' => 'Role sudah terdaftar.',
        ]);

        Role::create([
            'name' => $request->name,
        ]);

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
        ], [
            'name.required' => 'Nama harus diisi.',
            'name.min' => 'Nama minimal 3 karakter.',
            'name.unique' => 'Role sudah terdaftar.',
        ]);

        Role::find($id)->update([
            'name' => $request->name,
        ]);

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
