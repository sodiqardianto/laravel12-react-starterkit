<?php

namespace App\Providers;

use App\Models\Menu;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user();

        if (!$user) {
            return []; // Jika belum login, kosongkan menu
        }

        return Menu::with('children')
            ->whereNull('parent_id')
            ->get()
            ->filter(function ($menu) use ($user) {
                $canSeeParent = !$menu->permission || $user->can($menu->permission);

                $menu->children = $menu->children->filter(function ($child) use ($user) {
                    return !$child->permission || $user->can($child->permission);
                })->values();

                return $canSeeParent || $menu->children->isNotEmpty();
            })
            ->values()
            ->map(function ($menu) {
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
