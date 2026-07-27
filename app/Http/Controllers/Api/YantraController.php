<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Yantra;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class YantraController extends Controller
{
    public function index(): JsonResponse
    {
        $yantras = Yantra::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Yantra $yantra): array => [
                'id' => $yantra->id,
                'name' => $yantra->name,
                'details' => $yantra->details,
                'image_url' => Storage::disk('public')->url($yantra->image_path),
            ]);

        return response()->json([
            'data' => $yantras,
            'error' => null,
            'meta' => [
                'total' => $yantras->count(),
            ],
        ]);
    }
}
