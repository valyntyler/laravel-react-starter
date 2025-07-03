<?php

use App\Http\Controllers\Dashboard\UsersController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/users', [UsersController::class, 'index'])->name('dashboard.users.index');

    Route::get('/dashboard/users/{id}', [UsersController::class, 'show'])->name('dashboard.users.create');

    Route::get('/dashboard/users/add', [UsersController::class, 'create'])->name('dashboard.users.create');
    Route::post('/dashboard/users/add', [UsersController::class, 'store'])->name('dashboard.users.store');

    Route::get('/dashboard/users/edit/{id}', [UsersController::class, 'edit'])->name('dashboard.users.edit');
    Route::patch('/dashboard/users/edit/{id}', [UsersController::class, 'update'])->name('dashboard.users.update');

    Route::delete('/dashboard/users/{id}', [UsersController::class, 'destroy'])->name('dashboard.users.destroy');
});

require __DIR__.'/auth.php';
