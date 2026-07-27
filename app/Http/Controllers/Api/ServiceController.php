<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('display_order')
            ->orderBy('name')
            ->get()
            ->map(fn (Service $service): array => $this->servicePayload($service));

        return response()->json([
            'data' => $services,
            'error' => null,
            'meta' => [
                'total' => $services->count(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $service = Service::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'data' => $this->servicePayload($service),
            'error' => null,
            'meta' => [],
        ]);
    }

    private function servicePayload(Service $service): array
    {
        return [
            'id' => $service->id,
            'name' => $service->name,
            'slug' => $service->slug,
            'short_description' => $service->short_description,
            'description' => $service->description,
            'rate' => $service->rate,
            'duration' => $service->duration,
        ];
    }
}
