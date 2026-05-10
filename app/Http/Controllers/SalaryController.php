<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Models\Employee;
use App\Models\Attendance;
use App\Models\Bonus;
use App\Traits\UpdatesSalaryRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class SalaryController extends Controller
{
    use UpdatesSalaryRecord;
    public function index()
    {
        $salaries = Salary::with('employee')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->paginate(20);

        return Inertia::render('Salaries/Index', [
            'salaries' => $salaries
        ]);
    }

    public function generate()
    {
        $employees = Employee::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Salaries/Generate', [
            'employees' => $employees,
            'currentMonth' => now()->format('F'),
            'currentYear' => now()->year
        ]);
    }

    public function process(Request $request)
    {
        $request->validate([
            'month' => 'required|string',
            'year' => 'required|integer',
            'employee_ids' => 'required|array'
        ]);

        foreach ($request->employee_ids as $employeeId) {
            $employee = Employee::find($employeeId);
            if (!$employee) continue;

            // Find or create salary record
            $salary = Salary::firstOrCreate(
                [
                    'employee_id' => $employeeId,
                    'month' => $request->month,
                    'year' => $request->year,
                ],
                [
                    'base_amount' => $employee->base_salary,
                    'bonus_amount' => 0,
                    'deduction_amount' => 0,
                    'payments_amount' => 0,
                    'advances_amount' => 0,
                    'net_amount' => $employee->base_salary,
                    'status' => 'pending'
                ]
            );

            // Update salary record using the trait
            self::updateSalaryRecord($salary);
        }

        return redirect()->route('salaries.index')
            ->with('success', 'Salaries generated successfully.');
    }

    public function history()
    {
        $salaries = Salary::with('employee')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->paginate(20);

        return Inertia::render('Salaries/History', [
            'salaries' => $salaries
        ]);
    }
}