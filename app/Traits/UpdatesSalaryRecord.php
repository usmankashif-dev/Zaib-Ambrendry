<?php

namespace App\Traits;

use App\Models\Salary;
use Carbon\Carbon;

trait UpdatesSalaryRecord
{
    protected static function bootUpdatesSalaryRecord()
    {
        static::created(function ($model) {
            static::updateSalaryRecord($model);
        });

        static::deleted(function ($model) {
            static::updateSalaryRecord($model);
        });
    }

    protected static function updateSalaryRecord($model)
    {
        $date = $model->date ?? $model->transaction_date;
        $employeeId = $model->employee_id;

        $startDate = Carbon::parse($date)->startOfMonth();
        $endDate = Carbon::parse($date)->endOfMonth();
        $month = Carbon::parse($date)->format('F');
        $year = Carbon::parse($date)->year;

        // Get or create salary record
        $salary = Salary::firstOrCreate(
            [
                'employee_id' => $employeeId,
                'month' => $month,
                'year' => $year,
            ],
            [
                'base_amount' => $model->employee->base_salary,
                'bonus_amount' => 0,
                'deduction_amount' => 0,
                'payments_amount' => 0,
                'advances_amount' => 0,
                'net_amount' => $model->employee->base_salary,
                'status' => 'pending'
            ]
        );

        // Calculate total bonuses
        $bonusAmount = \App\Models\Bonus::where('employee_id', $employeeId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        // Calculate attendance deductions
        $workingDays = $endDate->diffInDaysFiltered(function(Carbon $date) {
            return !$date->isSunday(); // Exclude Sundays
        }, $startDate);

        $attendances = \App\Models\Attendance::where('employee_id', $employeeId)
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        $daysPresent = $attendances->count();
        $absences = max(0, $workingDays - $daysPresent);
        $deductionPerDay = $model->employee->base_salary / $workingDays;
        $attendanceDeductions = $absences * $deductionPerDay;

        // Calculate salary transactions
        $transactions = \App\Models\SalaryTransaction::where('employee_id', $employeeId)
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->get();

        $paymentsAmount = $transactions->where('type', 'payment')->sum('amount');
        $advancesAmount = $transactions->where('type', 'advance')->sum('amount');

        // Update salary record
        $totalDeductions = $attendanceDeductions + $paymentsAmount + $advancesAmount;
        $netAmount = $model->employee->base_salary + $bonusAmount - $totalDeductions;

        $salary->update([
            'bonus_amount' => $bonusAmount,
            'deduction_amount' => $totalDeductions,
            'payments_amount' => $paymentsAmount,
            'advances_amount' => $advancesAmount,
            'net_amount' => $netAmount
        ]);
    }
}