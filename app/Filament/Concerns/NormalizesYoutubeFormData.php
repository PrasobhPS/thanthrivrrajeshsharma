<?php

namespace App\Filament\Concerns;

use App\Support\YoutubeId;
use Illuminate\Validation\ValidationException;

trait NormalizesYoutubeFormData
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function normalizeYoutubeFormData(array $data): array
    {
        $raw = trim((string) ($data['youtube_id'] ?? ''));
        $normalized = YoutubeId::normalize($raw);
        if ($normalized === null) {
            throw ValidationException::withMessages([
                'youtube_id' => __('Enter a valid YouTube URL or video ID.'),
            ]);
        }

        $data['youtube_id'] = $normalized;

        return $data;
    }
}
