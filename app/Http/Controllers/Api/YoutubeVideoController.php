<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\YoutubeVideo;
use Illuminate\Http\JsonResponse;

class YoutubeVideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = YoutubeVideo::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (YoutubeVideo $video): array => [
                'id' => $video->id,
                'title' => $video->title,
                'youtube_id' => $video->youtube_id,
                'tag' => $video->tag,
                'channel_label' => $video->channel_label,
                'meta_line' => $video->meta_line,
                'thumbnail_url' => $video->thumbnailUrl(),
                'watch_url' => 'https://www.youtube.com/watch?v='.$video->youtube_id,
            ]);

        return response()->json([
            'data' => $videos,
            'error' => null,
            'meta' => [
                'total' => $videos->count(),
            ],
        ]);
    }
}
