<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Testimonial $testimonial): array => [
                'id' => $testimonial->id,
                'quote' => $testimonial->quote,
                'name' => $testimonial->author_name,
                'role' => $testimonial->author_role,
                'city' => $testimonial->author_city,
                'tag' => $testimonial->tag,
                'image_url' => Storage::disk('public')->url($testimonial->image_path),
            ]);

        return response()->json([
            'data' => $testimonials,
            'error' => null,
            'meta' => [
                'total' => $testimonials->count(),
            ],
        ]);
    }
}
