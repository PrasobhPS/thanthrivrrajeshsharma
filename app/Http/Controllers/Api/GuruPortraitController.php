<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GuruPortrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class GuruPortraitController extends Controller
{
    public function index(): JsonResponse
    {
        $portraits = GuruPortrait::query()
            ->orderByDesc('is_default')
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (GuruPortrait $portrait): array => $this->transform($portrait));

        return response()->json([
            'data' => $portraits,
            'error' => null,
            'meta' => [
                'total' => $portraits->count(),
            ],
        ]);
    }

    public function defaultPortrait(): JsonResponse
    {
        $portrait = GuruPortrait::query()
            ->where('is_default', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->first();

        return response()->json([
            'data' => $portrait ? $this->transform($portrait) : null,
            'error' => null,
            'meta' => [],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function transform(GuruPortrait $portrait): array
    {
        return [
            'id' => $portrait->id,
            'title' => $portrait->title,
            'alt_text' => $portrait->alt_text,
            'image_url' => Storage::disk('public')->url($portrait->image_path),
            'is_default' => $portrait->is_default,
        ];
    }
}
