<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MenuController extends Controller
{
    function toPascalCase($string)
    {
        // Ganti semua separator (-, _, spasi) menjadi spasi
        $string = preg_replace('/[-_\s]+/', ' ', $string);
        // Ubah menjadi Pascal Case
        return ucwords(str_replace(' ', '', ucwords($string)));
    }

    public function reorder(Request $request)
    {
        $menus = $request->input('menus', []);
        
        foreach ($menus as $index => $menuData) {
            $menu = Menu::find($menuData['id']);
            if ($menu) {
                $menu->order = $index;
                $menu->parent_id = null;
                $menu->save();

                if (!empty($menuData['children'])) {
                    foreach ($menuData['children'] as $childIndex => $childData) {
                        $child = Menu::find($childData['id']);
                        if ($child) {
                            $child->order = $childIndex;
                            $child->parent_id = $menu->id;
                            $child->save();
                        }
                    }
                }
            }
        }

        return back();
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $menusQuery = Menu::with('children')->whereNull('parent_id');

        if ($search) {
            $menusQuery->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%')
                      ->orWhereHas('children', function ($query) use ($search) {
                          $query->where('name', 'LIKE', '%' . $search . '%');
                      });
            });
        }

        $menus = $menusQuery
            ->orderBy('order')
            ->get()
            ->map(function ($menu) {
                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'href' => $menu->href,
                    'icon' => $menu->icon,
                    'children' => $menu->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'name' => $child->name,
                            'href' => $child->href,
                            'icon' => $child->icon,
                        ];
                    }),
                ];
            });

        return Inertia::render('menus/index', [
            'menus' => $menus,
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
        $validated = $request->validate([
            'name' => 'required|unique:menus,name',
            'href' => 'required|string',
            'icon' => 'nullable|string',
            'parent_id' => 'nullable|exists:menus,id',
        ], [
            'name.required' => 'Nama menu harus diisi.',
            'name.unique' => 'Nama menu sudah digunakan.',
            'href.required' => 'URL menu harus diisi.',
        ]);

        if ($validated['parent_id']) {
            $validated['order'] = Menu::where('parent_id', $validated['parent_id'])->max('order') + 1;
        }

        $validated['order'] = Menu::whereNull('parent_id')->max('order') + 1;
        $validated['icon'] = $validated['icon'] ? $this->toPascalCase($validated['icon']) : null;

         // Tambahkan permission otomatis
        $permissionName = 'view ' . Str::lower($validated['name']);
        $validated['permission'] = $permissionName;

        // Buat permission jika belum ada
        Permission::firstOrCreate(['name' => $permissionName]);

        Menu::create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|unique:menus,name,' . $menu->id,
            'href' => 'required|string',
            'icon' => 'nullable|string',
            'parent_id' => 'nullable|exists:menus,id',
        ], [
            'name.required' => 'Nama menu harus diisi.',
            'name.unique' => 'Nama menu sudah digunakan.',
            'href.required' => 'URL menu harus diisi.',
        ]);

        $validated['icon'] = $validated['icon'] ? $this->toPascalCase($validated['icon']) : null;

        // Generate permission name dari name
        $newPermission = 'view ' . Str::lower($validated['name']);

        // Jika permission berubah, update permission
        if ($menu->permission !== $newPermission) {
            $validated['permission'] = $newPermission;

            // Buat permission baru jika belum ada
            Permission::firstOrCreate(['name' => $newPermission]);

            // Optional: hapus permission lama jika tidak dipakai menu lain
            if ($menu->permission && !Menu::where('permission', $menu->permission)->where('id', '!=', $menu->id)->exists()) {
                Permission::where('name', $menu->permission)->delete();
            }
        }
        
        $menu->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return back();
    }
}

