<?php

namespace App\Models;

use App\Traits\UpdatesSalaryRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bonus extends Model
{
    use UpdatesSalaryRecord;
    protected $fillable = [
        'employee_id',
        'amount',
        'reason',
        'date',
        'remarks',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}