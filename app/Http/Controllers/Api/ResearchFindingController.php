<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResearchFinding;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ResearchFindingController extends Controller
{
    public function index(): JsonResponse
    {
        $findings = ResearchFinding::query()
            ->where('is_active', true)
            ->orderByDesc('published_at')
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (ResearchFinding $finding): array => [
                'id' => $finding->id,
                'reference_code' => $finding->reference_code,
                'category' => $finding->category,
                'title' => $finding->title,
                'excerpt' => $finding->excerpt,
                'image_url' => Storage::disk('public')->url($finding->image_path),
                'published_at' => $finding->published_at?->toDateString(),
                'read_time_minutes' => $finding->read_time_minutes,
                'tags' => $finding->tags ?? [],
            ]);

        return response()->json([
            'data' => $findings,
            'error' => null,
            'meta' => [
                'total' => $findings->count(),
            ],
        ]);
    }
}
