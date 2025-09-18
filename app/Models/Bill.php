<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = [
        'machine_id',
        'snapshot_id',
        'than_amount',
        'return_time',
        'bill_amount'
    ];

    protected $casts = [
        'return_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function machine()
    {
        return $this->belongsTo(MachineDetail::class, 'machine_id');
    }

    public function snapshot()
    {
        return $this->belongsTo(MachineSnapshot::class);
    }
}