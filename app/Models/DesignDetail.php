<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignDetail extends Model
{
    protected $fillable = [
        'mall_id',
        'design_number',
        'stitch_amount'
    ];

    public function mall()
    {
        return $this->belongsTo(Mall::class);
    }
}
