<?php

namespace App\Http\Middleware;

use App\Services\SiteVisitRecorder;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RecordSiteVisit
{
    public function __construct(private SiteVisitRecorder $recorder) {}

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $this->recorder->recordIfEligible($request, $response);

        return $response;
    }
}
