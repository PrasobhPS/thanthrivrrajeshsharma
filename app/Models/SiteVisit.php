<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class SiteVisit extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'path',
        'visited_at',
    ];

    protected function casts(): array
    {
        return [
            'visited_at' => 'datetime',
        ];
    }

    public static function countSince(Carbon $since): int
    {
        return static::query()
            ->where('visited_at', '>=', $since)
            ->count();
    }

    /**
     * @return list<float>
     */
    public static function dailyCounts(int $days): array
    {
        $start = now()->subDays($days - 1)->startOfDay();

        $counts = static::query()
            ->where('visited_at', '>=', $start)
            ->get(['visited_at'])
            ->countBy(fn (SiteVisit $visit): string => $visit->visited_at->toDateString());

        $series = [];

        for ($offset = 0; $offset < $days; $offset++) {
            $date = $start->copy()->addDays($offset)->toDateString();
            $series[] = (float) ($counts[$date] ?? 0);
        }

        return $series;
    }
}
