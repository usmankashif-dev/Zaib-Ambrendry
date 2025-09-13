<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class History extends Model
{
    use HasFactory;

    protected $fillable = [
        'action',
        'description',
        'user_name',
        'model_type',
        'model_id',
        'mall_id',
        'old_data',
        'new_data'
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array'
    ];

    public function mall()
    {
        return $this->belongsTo(Mall::class);
    }
}
