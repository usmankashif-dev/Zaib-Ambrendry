<?php

namespace App\Models;

use App\Traits\UpdatesSalaryRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalaryTransaction extends Model
{
    use UpdatesSalaryRecord;
    protected $fillable = [
        'employee_id',
        'amount',
        'type',
        'transaction_date',
        'notes'
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2'
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}