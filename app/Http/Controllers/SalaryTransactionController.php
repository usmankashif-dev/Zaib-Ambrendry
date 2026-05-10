<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\SalaryTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryTransactionController extends Controller
{
    public function index()
    {
        $transactions = SalaryTransaction::with('employee')
            ->orderBy('transaction_date', 'desc')
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'employee_name' => $transaction->employee->name,
                    'amount' => $transaction->amount,
                    'type' => $transaction->type,
                    'transaction_date' => $transaction->transaction_date->format('Y-m-d'),
                    'notes' => $transaction->notes
                ];
            });

        return Inertia::render('Salaries/Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function create()
    {
        $employees = Employee::select('id', 'name')->get();
        
        return Inertia::render('Salaries/Transactions/Form', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:payment,advance',
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        SalaryTransaction::create($validated);

        return redirect()->route('salary-transactions.index')
            ->with('success', 'Transaction recorded successfully');
    }
}