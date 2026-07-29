<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GuruProfileDetail;
use Illuminate\Http\JsonResponse;

class GuruProfileDetailController extends Controller
{
    public function index(): JsonResponse
    {
        $details = GuruProfileDetail::query()
            ->orderByDesc('is_default')
            ->orderBy('display_order')
            ->orderBy('id')
            ->get()
            ->map(fn (GuruProfileDetail $detail): array => $this->transform($detail));

        return response()->json([
            'data' => $details,
            'error' => null,
            'meta' => [
                'total' => $details->count(),
            ],
        ]);
    }

    public function defaultDetail(): JsonResponse
    {
        $detail = GuruProfileDetail::query()
            ->where('is_default', true)
            ->orderBy('display_order')
            ->orderBy('id')
            ->first();

        return response()->json([
            'data' => $detail ? $this->transform($detail) : null,
            'error' => null,
            'meta' => [],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function transform(GuruProfileDetail $detail): array
    {
        return [
            'id' => $detail->id,
            'title' => $detail->title,
            'eyebrow' => $detail->eyebrow,
            'title_line_1' => $detail->title_line_1,
            'title_line_2' => $detail->title_line_2,
            'authority_label' => $detail->authority_label,
            'authority_quote' => $detail->authority_quote,
            'verification_badge_label' => $detail->verification_badge_label,
            'verification_grade' => $detail->verification_grade,
            'tradition_seal_text' => $detail->tradition_seal_text,
            'bio_lead' => $detail->bio_lead,
            'bio_description' => $detail->bio_description,
            'stat_one_label' => $detail->stat_one_label,
            'stat_one_value' => $detail->stat_one_value,
            'stat_one_sublabel' => $detail->stat_one_sublabel,
            'stat_two_label' => $detail->stat_two_label,
            'stat_two_value' => $detail->stat_two_value,
            'stat_two_sublabel' => $detail->stat_two_sublabel,
            'consultation_status_text' => $detail->consultation_status_text,
            'is_default' => $detail->is_default,
        ];
    }
}
