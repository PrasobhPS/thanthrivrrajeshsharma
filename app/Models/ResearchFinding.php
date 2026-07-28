<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchFinding extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_code',
        'category',
        'title',
        'excerpt',
        'image_path',
        'published_at',
        'read_time_minutes',
        'tags',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'read_time_minutes' => 'integer',
            'tags' => 'array',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
