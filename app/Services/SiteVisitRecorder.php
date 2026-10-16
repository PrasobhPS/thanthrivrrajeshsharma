<?php

namespace App\Services;

use App\Models\SiteVisit;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SiteVisitRecorder
{
    private const SESSION_KEY = 'site_visit_recorded';

    public function recordIfEligible(Request $request, Response $response): void
    {
        if (! $this->shouldRecord($request, $response)) {
            return;
        }

        try {
            SiteVisit::query()->create([
                'path' => $this->path($request),
                'visited_at' => now(),
            ]);

            $request->session()->put(self::SESSION_KEY, true);
        } catch (Throwable $exception) {
            report($exception);
        }
    }

    private function shouldRecord(Request $request, Response $response): bool
    {
        if (! $request->isMethod('GET') || ! $response->isSuccessful()) {
            return false;
        }

        if ($request->session()->get(self::SESSION_KEY) === true) {
            return false;
        }

        if ($this->isPrefetch($request) || $this->isBot($request) || $this->isAsset($request)) {
            return false;
        }

        return true;
    }

    private function path(Request $request): string
    {
        $path = $request->path();

        if ($path === '/') {
            return '/';
        }

        return '/'.mb_substr($path, 0, 254);
    }

    private function isPrefetch(Request $request): bool
    {
        $purpose = strtolower((string) ($request->header('Purpose') ?: $request->header('Sec-Purpose')));

        return str_contains($purpose, 'prefetch');
    }

    private function isBot(Request $request): bool
    {
        $userAgent = (string) $request->userAgent();

        return (bool) preg_match('/bot|crawl|spider|slurp|facebookexternalhit|wget|curl/i', $userAgent);
    }

    private function isAsset(Request $request): bool
    {
        return (bool) preg_match('/\.(?:css|js|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|xml|txt|json)$/i', $request->path());
    }
}
