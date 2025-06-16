<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $menus = Menu::with('children')
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get()
            ->map(function ($menu) {
                return [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'href' => '/' . $menu->href,
                    'icon' => $menu->icon,
                    'children' => $menu->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'name' => $child->name,
                            'href' => '/' . $child->href,
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
            'name' => 'required|string',
            'href' => 'required|string',
            'icon' => 'nullable|string',
            'parent_id' => 'nullable|exists:menus,id',
        ], [
            'name.required' => 'Nama menu harus diisi.',
            'href.required' => 'URL menu harus diisi.',
        ]);

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
