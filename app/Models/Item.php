<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'name',
        'shade',
        'quantity',
        'total_price',
    ];

    protected $casts = [
        'date' => 'date',
        'total_price' => 'decimal:2',
    ];
}