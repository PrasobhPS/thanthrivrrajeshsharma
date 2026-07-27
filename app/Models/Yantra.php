<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Yantra extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_path',
        'details',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
