<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MachineSnapshot extends Model
{
    protected $fillable = [
        'bill_id',
        'employee_name',
        'production_time',
        'design_id'
    ];

    protected $casts = [
        'production_time' => 'datetime'
    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function design()
    {
        return $this->belongsTo(DesignDetail::class);
    }
}