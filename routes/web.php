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

Route::get('/dashboard', function () {
    $malls = \App\Models\Mall::latest()->get();
    \Log::info('Fetching malls for dashboard. Count: ' . $malls->count());
    \Log::info('Malls data:', $malls->toArray());
    return Inertia::render('Dashboard', [
        'malls' => $malls
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/add-mall', function () {
        return Inertia::render('AddMallForm');
    })->name('mall.add');
    
    Route::post('/add-mall', [App\Http\Controllers\MallController::class, 'store'])->name('mall.store');
    // Delete a mall
    Route::delete('/malls/{mall}', [App\Http\Controllers\MallController::class, 'destroy'])->name('mall.destroy');
    // Edit routes
    Route::get('/edit-mall/{mall}', [App\Http\Controllers\MallController::class, 'edit'])->name('mall.edit');
    Route::patch('/edit-mall/{mall}', [App\Http\Controllers\MallController::class, 'update'])->name('mall.update');

    // History routes
    Route::get('/history', [App\Http\Controllers\HistoryController::class, 'index'])->name('history.index');
    Route::get('/history/{history}', [App\Http\Controllers\HistoryController::class, 'show'])->name('history.show');
});

require __DIR__.'/auth.php';
