<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): JsonResponse
    {
        $inquiry = Inquiry::query()->create([
            ...$request->validated(),
            'status' => Inquiry::STATUS_NEW,
        ]);

        Log::info('New puja inquiry submitted.', [
            'inquiry_id' => $inquiry->id,
            'service_id' => $inquiry->service_id,
        ]);

        return response()->json([
            'data' => [
                'id' => $inquiry->id,
                'status' => $inquiry->status,
                'message' => 'Your inquiry has been received. We will contact you soon.',
            ],
            'error' => null,
            'meta' => [],
        ], 201);
    }
}
