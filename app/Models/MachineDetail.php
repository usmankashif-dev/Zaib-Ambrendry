<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MachineDetail extends Model
{
    protected $fillable = [
        'design_id',
        'employee_name',
        'production_time'
    ];

    protected $casts = [
        'production_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function design()
    {
        return $this->belongsTo(DesignDetail::class, 'design_id');
    }
}
