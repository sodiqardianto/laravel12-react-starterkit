<?php

namespace App\Providers;

use App\Models\Menu;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('menus', function () {
        return Menu::with('children')->whereNull('parent_id')->get()->map(function ($menu) {
            return [
                'name' => $menu->name,
                'href' => $menu->href,
                'icon' => $menu->icon,
                'children' => $menu->children->map(function ($child) {
                    return [
                        'name' => $child->name,
                        'href' => $child->href,
                        'icon' => $child->icon,
                    ];
                }),
            ];
        });
    });
    }
}
