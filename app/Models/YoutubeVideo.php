<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YoutubeVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'youtube_id',
        'tag',
        'channel_label',
        'meta_line',
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

    public function thumbnailUrl(string $quality = 'hqdefault'): string
    {
        return "https://img.youtube.com/vi/{$this->youtube_id}/{$quality}.jpg";
    }
}
