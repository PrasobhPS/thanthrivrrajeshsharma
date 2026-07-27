<?php

namespace App\Support;

final class YoutubeId
{
    /**
     * Extract an 11-character YouTube video id from a pasted URL or raw id.
     */
    public static function normalize(?string $input): ?string
    {
        if ($input === null) {
            return null;
        }

        $trimmed = trim($input);
        if ($trimmed === '') {
            return null;
        }

        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', $trimmed)) {
            return $trimmed;
        }

        $patterns = [
            '/youtube\.com\/watch\?[^&]*v=([a-zA-Z0-9_-]{11})/',
            '/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/',
            '/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/',
            '/youtu\.be\/([a-zA-Z0-9_-]{11})/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $trimmed, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }
}
