<?php

namespace App\Http\Controllers;

use App\Models\Bonus;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BonusController extends Controller
{
    public function index()
    {
        $bonuses = Bonus::with('employee')
            ->orderBy('date', 'desc')
            ->paginate(20);

        return Inertia::render('Bonuses/Index', [
            'bonuses' => $bonuses
        ]);
    }

    public function create()
    {
        $employees = Employee::orderBy('name')->get();
        
        return Inertia::render('Bonuses/Create', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:0',
            'reason' => 'required|string|max:255',
            'date' => 'required|date',
            'remarks' => 'nullable|string|max:500',
        ]);

        Bonus::create($validated);

        return redirect()->route('bonuses.index')
            ->with('success', 'Bonus added successfully.');
    }

    public function destroy(Bonus $bonus)
    {
        $bonus->delete();
        
        return redirect()->route('bonuses.index')
            ->with('success', 'Bonus deleted successfully.');
    }
}