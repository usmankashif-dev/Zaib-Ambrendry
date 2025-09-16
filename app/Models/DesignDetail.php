<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignDetail extends Model
{
    const STATUS_ACTIVE = 'active';
    const STATUS_IN_MACHINE = 'in_machine';

    protected $fillable = [
        'mall_id',
        'design_number',
        'stitch_amount',
        'status'
    ];

    public function mall()
    {
        return $this->belongsTo(Mall::class);
    }

    public function machineDetail()
    {
        return $this->hasOne(MachineDetail::class, 'design_id');
    }
}
