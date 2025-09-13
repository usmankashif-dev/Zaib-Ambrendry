<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mall extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::created(function ($mall) {
            History::create([
                'action' => 'create',
                'description' => "Created mall entry for {$mall->partyName}",
                'user_name' => auth()->user()->name,
                'model_type' => 'Mall',
                'model_id' => $mall->id,
                'mall_id' => $mall->id,
                'new_data' => $mall->toArray()
            ]);
        });

        static::updated(function ($mall) {
            $changes = $mall->getDirty();
            $original = array_intersect_key($mall->getOriginal(), $changes);
            
            History::create([
                'action' => 'update',
                'description' => "Updated mall entry for {$mall->partyName}",
                'user_name' => auth()->user()->name,
                'model_type' => 'Mall',
                'model_id' => $mall->id,
                'mall_id' => $mall->id,
                'old_data' => $original,
                'new_data' => $changes
            ]);
        });

        static::deleting(function ($mall) {
            History::create([
                'action' => 'delete',
                'description' => "Deleted mall entry for {$mall->partyName}",
                'user_name' => auth()->user()->name,
                'model_type' => 'Mall',
                'model_id' => $mall->id,
                'old_data' => $mall->toArray()
            ]);
        });
    }

    const STATUS_PENDING = 'pending';
    const STATUS_IN_DESIGN = 'in_design';
    const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'partyName',
        'gazana',
        'thanAmount',
        'partyArrivalTime',
        'frontLength',
        'backLength',
        'dupattaLength',
        'lot',
        'colorAmount',
        'status'
    ];

    protected $casts = [
        'partyArrivalTime' => 'datetime',
        'frontLength' => 'string',
        'backLength' => 'string',
        'dupattaLength' => 'string'
    ];

    public function histories()
    {
        return $this->hasMany(History::class);
    }

    public function designs()
    {
        return $this->hasMany(DesignDetail::class);
    }
}
