<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Item Names API
Route::get('/api/item-names', [App\Http\Controllers\ItemNameController::class, 'index'])->middleware('auth');
Route::post('/api/item-names', [App\Http\Controllers\ItemNameController::class, 'store'])->middleware('auth');

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

    // Bill routes
    Route::get('/bill', [App\Http\Controllers\BillController::class, 'index'])->name('bill.index');
    Route::get('/bill/create/{machine}', [App\Http\Controllers\BillController::class, 'create'])->name('bill.create');
    Route::post('/bill/{machine}', [App\Http\Controllers\BillController::class, 'store'])->name('bill.store');
    Route::get('/bill/{bill}/edit', [App\Http\Controllers\BillController::class, 'edit'])->name('bill.edit');
    Route::patch('/bill/{bill}', [App\Http\Controllers\BillController::class, 'update'])->name('bill.update');
    Route::delete('/bill/{bill}', [App\Http\Controllers\BillController::class, 'destroy'])->name('bill.destroy');
    Route::get('/bill/{bill}/invoice', [App\Http\Controllers\BillController::class, 'invoice'])->name('bill.invoice');
    
    // Invoice routes
    Route::get('/invoice', [App\Http\Controllers\InvoiceController::class, 'create'])->name('invoice.create');
    Route::post('/invoice', [App\Http\Controllers\InvoiceController::class, 'store'])->name('invoice.store');

    // Items routes
    Route::get('/items/new', function() {
        return Inertia::render('Items/NewItem', [
            'itemNames' => \App\Models\ItemName::orderBy('name')->get()
        ]);
    })->name('items.new');
    
    Route::post('/items', [App\Http\Controllers\ItemController::class, 'store'])->name('items.store');
    Route::get('/items/history', [App\Http\Controllers\ItemController::class, 'index'])->name('items.history');

    // Employee Management Routes
    Route::get('/employees', [App\Http\Controllers\EmployeeController::class, 'index'])->name('employees.index');
    Route::get('/employees/create', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employees.create');
    Route::post('/employees', [App\Http\Controllers\EmployeeController::class, 'store'])->name('employees.store');
    Route::get('/employees/{employee}/edit', [App\Http\Controllers\EmployeeController::class, 'edit'])->name('employees.edit');
    Route::patch('/employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'destroy'])->name('employees.destroy');
    Route::get('/employees/{employee}/attendance', [App\Http\Controllers\EmployeeController::class, 'attendanceHistory'])->name('employees.attendance');

    // Attendance Routes
    Route::get('/attendance', [App\Http\Controllers\AttendanceController::class, 'index'])->name('attendance.index');
    Route::get('/attendance/create', [App\Http\Controllers\AttendanceController::class, 'create'])->name('attendance.create');
    Route::post('/attendance', [App\Http\Controllers\AttendanceController::class, 'store'])->name('attendance.store');
    Route::post('/attendance/check-in/{employee}', [App\Http\Controllers\AttendanceController::class, 'checkIn'])->name('attendance.checkIn');
    Route::post('/attendance/check-out/{employee}', [App\Http\Controllers\AttendanceController::class, 'checkOut'])->name('attendance.checkOut');
    Route::get('/attendance/history', [App\Http\Controllers\AttendanceController::class, 'history'])->name('attendance.history');

    // Bonus Routes
    Route::get('/bonuses', [App\Http\Controllers\BonusController::class, 'index'])->name('bonuses.index');
    Route::get('/bonuses/create', [App\Http\Controllers\BonusController::class, 'create'])->name('bonuses.create');
    Route::post('/bonuses', [App\Http\Controllers\BonusController::class, 'store'])->name('bonuses.store');
    Route::delete('/bonuses/{bonus}', [App\Http\Controllers\BonusController::class, 'destroy'])->name('bonuses.destroy');

    // Salary Routes
    Route::get('/salaries', [App\Http\Controllers\SalaryController::class, 'index'])->name('salaries.index');
    Route::get('/salaries/generate', [App\Http\Controllers\SalaryController::class, 'generate'])->name('salaries.generate');
    Route::post('/salaries/process', [App\Http\Controllers\SalaryController::class, 'process'])->name('salaries.process');
    Route::get('/salaries/history', [App\Http\Controllers\SalaryController::class, 'history'])->name('salaries.history');

    // Salary Transactions Routes
    Route::get('/salary-transactions', [App\Http\Controllers\SalaryTransactionController::class, 'index'])->name('salary-transactions.index');
    Route::get('/salary-transactions/create', [App\Http\Controllers\SalaryTransactionController::class, 'create'])->name('salary-transactions.create');
    Route::post('/salary-transactions', [App\Http\Controllers\SalaryTransactionController::class, 'store'])->name('salary-transactions.store');
});

require __DIR__.'/auth.php';
