<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::name('pos.')->group(function () {
        Route::controller(\App\Http\Controllers\Staff\StaffController::class)
            ->prefix('/staff')
            ->name('staff.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{staff_id}/details', 'view')->name('view');
                Route::get('/{staff_id}/edit', 'edit')->name('edit');
                Route::patch('/{staff_id}/update', 'update')->name('update');
            });

        Route::controller(\App\Http\Controllers\RolePermission\RolePermissionController::class)
            ->prefix('/role')
            ->name('role.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{role_id}/details', 'view')->name('view');
            });
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
