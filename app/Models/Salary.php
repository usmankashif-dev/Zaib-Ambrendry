<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Salary extends Model
{
    protected $fillable = [
        'employee_id',
        'base_amount',
        'bonus_amount',
        'deduction_amount',
        'payments_amount',
        'advances_amount',
        'net_amount',
        'month',
        'year',
        'status',
        'payment_date',
        'remarks',
    ];

    protected $casts = [
        'base_amount' => 'decimal:2',
        'bonus_amount' => 'decimal:2',
        'deduction_amount' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'payment_date' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}