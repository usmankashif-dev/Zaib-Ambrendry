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
    $malls = \App\Models\Mall::where('status', \App\Models\Mall::STATUS_PENDING)->latest()->get();
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

    // Design routes
    Route::get('/design', [App\Http\Controllers\DesignController::class, 'index'])->name('design.index');
    Route::get('/design/{mall}/create', [App\Http\Controllers\DesignController::class, 'create'])->name('design.create');
    Route::post('/design/{mall}', [App\Http\Controllers\DesignController::class, 'store'])->name('design.store');
    Route::get('/design/{design}/edit', [App\Http\Controllers\DesignController::class, 'edit'])->name('design.edit');
    Route::patch('/design/{design}', [App\Http\Controllers\DesignController::class, 'update'])->name('design.update');
    Route::post('/design/{design}/return', [App\Http\Controllers\DesignController::class, 'return'])->name('design.return');
    Route::delete('/design/{design}', [App\Http\Controllers\DesignController::class, 'destroy'])->name('design.destroy');

    // Machine routes
    Route::get('/machine', [App\Http\Controllers\MachineController::class, 'index'])->name('machine.index');
    Route::get('/machine/create/{design}', [App\Http\Controllers\MachineController::class, 'create'])->name('machine.create');
    Route::post('/machine/{design}', [App\Http\Controllers\MachineController::class, 'store'])->name('machine.store');
    Route::get('/machine/{machine}/edit', [App\Http\Controllers\MachineController::class, 'edit'])->name('machine.edit');
    Route::patch('/machine/{machine}', [App\Http\Controllers\MachineController::class, 'update'])->name('machine.update');
    Route::delete('/machine/{machine}', [App\Http\Controllers\MachineController::class, 'destroy'])->name('machine.destroy');
});

require __DIR__.'/auth.php';
