<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mall extends Model
{
    use HasFactory;

    protected $fillable = [
        'partyName',
        'gazana',
        'thanAmount',
        'partyArrivalTime',
        'frontLength',
        'backLength',
        'dupattaLength',
        'lot',
        'colorAmount'
    ];

    protected $casts = [
        'partyArrivalTime' => 'datetime',
        'frontLength' => 'string',
        'backLength' => 'string',
        'dupattaLength' => 'string'
    ];
}
