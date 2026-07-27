<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'short_description',
        'description',
        'rate',
        'duration',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:2',
            'display_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }
}
