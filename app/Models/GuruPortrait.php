<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuruPortrait extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image_path',
        'alt_text',
        'display_order',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
            'is_default' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (GuruPortrait $portrait): void {
            if (! static::query()->exists()) {
                $portrait->is_default = true;
            }
        });

        static::saving(function (GuruPortrait $portrait): void {
            if (! $portrait->is_default) {
                return;
            }

            static::query()
                ->when($portrait->exists, fn ($query) => $query->whereKeyNot($portrait->getKey()))
                ->update(['is_default' => false]);
        });

        static::deleted(function (GuruPortrait $portrait): void {
            if (! $portrait->is_default) {
                return;
            }

            $next = static::query()
                ->orderBy('display_order')
                ->orderBy('id')
                ->first();

            if ($next !== null) {
                $next->forceFill(['is_default' => true])->save();
            }
        });
    }
}
