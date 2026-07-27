<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class GalleryPhotoController extends Controller
{
    public function index(): JsonResponse
    {
        $photos = GalleryPhoto::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (GalleryPhoto $photo): array => [
                'id' => $photo->id,
                'title' => $photo->title,
                'alt_text' => $photo->alt_text,
                'category' => $photo->category,
                'image_url' => Storage::disk('public')->url($photo->image_path),
            ]);

        return response()->json([
            'data' => $photos,
            'error' => null,
            'meta' => [
                'total' => $photos->count(),
            ],
        ]);
    }
}
