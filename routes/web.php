<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('menus', MenuController::class);
    Route::post('/menus/reorder', [MenuController::class, 'reorder']);

    Route::resource('users', UserController::class);
    
    Route::resource('roles', RoleController::class);
    
    Route::resource('permissions', PermissionController::class);
    Route::post('/permissions/bulk-delete', [PermissionController::class, 'bulkDelete'])->name('permissions.bulk-delete');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
