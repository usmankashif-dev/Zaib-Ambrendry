<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['attendances' => function($query) {
            $query->whereDate('date', today());
        }])->get();

        return Inertia::render('Attendance/Index', [
            'employees' => $employees,
            'date' => now()->toDateString()
        ]);
    }

    public function create()
    {
        $employees = Employee::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Attendance/Create', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'hours_worked' => 'required|numeric|min:0'
        ]);

        // Create attendance record with the specified date and times
        Attendance::create([
            'employee_id' => $validated['employee_id'],
            'date' => Carbon::parse($validated['date'])->toDateString(),
            'check_in' => Carbon::parse($validated['check_in']),
            'check_out' => Carbon::parse($validated['check_out']),
            'hours_worked' => $validated['hours_worked'],
            'status' => 'present'
        ]);

        return redirect()->route('attendance.index')
            ->with('success', 'Attendance record created successfully.');
    }

    public function checkIn(Request $request, Employee $employee)
    {
        $attendance = Attendance::firstOrCreate(
            [
                'employee_id' => $employee->id,
                'date' => today()
            ],
            [
                'check_in' => now(),
                'status' => 'present'
            ]
        );

        return redirect()->back()
            ->with('success', 'Check-in recorded successfully.');
    }

    public function checkOut(Request $request, Employee $employee)
    {
        $attendance = Attendance::where('employee_id', $employee->id)
            ->whereDate('date', today())
            ->first();

        if ($attendance) {
            $checkOut = now();
            $checkIn = Carbon::parse($attendance->check_in);
            $hoursWorked = $checkIn->floatDiffInHours($checkOut);

            $attendance->update([
                'check_out' => $checkOut,
                'hours_worked' => $hoursWorked
            ]);
        }

        return redirect()->back()
            ->with('success', 'Check-out recorded successfully.');
    }

    public function history()
    {
        $attendances = Attendance::with('employee')
            ->orderBy('date', 'desc')
            ->paginate(20);

        return Inertia::render('Attendance/History', [
            'attendances' => $attendances
        ]);
    }
}