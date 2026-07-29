<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuruProfileDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'eyebrow',
        'title_line_1',
        'title_line_2',
        'authority_label',
        'authority_quote',
        'verification_badge_label',
        'verification_grade',
        'tradition_seal_text',
        'bio_lead',
        'bio_description',
        'stat_one_label',
        'stat_one_value',
        'stat_one_sublabel',
        'stat_two_label',
        'stat_two_value',
        'stat_two_sublabel',
        'consultation_status_text',
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
        static::creating(function (GuruProfileDetail $detail): void {
            if (! static::query()->exists()) {
                $detail->is_default = true;
            }
        });

        static::saving(function (GuruProfileDetail $detail): void {
            if (! $detail->is_default) {
                return;
            }

            static::query()
                ->when($detail->exists, fn ($query) => $query->whereKeyNot($detail->getKey()))
                ->update(['is_default' => false]);
        });

        static::deleted(function (GuruProfileDetail $detail): void {
            if (! $detail->is_default) {
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
