<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MachineDetail extends Model
{
    protected $fillable = [
        'design_id',
        'employee_name',
        'production_time',
        'than_remaining'
    ];

    protected $casts = [
        'production_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'than_remaining' => 'integer'
    ];

    public function design()
    {
        return $this->belongsTo(DesignDetail::class, 'design_id');
    }
    
    public function bills()
    {
        return $this->hasMany(Bill::class, 'machine_id');
    }
    
    protected static function boot()
    {
        parent::boot();
        
        static::deleting(function ($machine) {
            // Update bills to remove machine_id reference before deletion
            $machine->bills()->update(['machine_id' => null]);
        });
    }
}
