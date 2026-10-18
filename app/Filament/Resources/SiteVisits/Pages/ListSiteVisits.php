<?php

namespace App\Filament\Resources\SiteVisits\Pages;

use App\Filament\Resources\SiteVisits\SiteVisitResource;
use App\Models\SiteVisit;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ListSiteVisits extends ListRecords
{
    protected static string $resource = SiteVisitResource::class;

    public function getSubheading(): string|Htmlable|null
    {
        return 'Visits are grouped by day. Search for a date, or use From and To, then open a day to see each visit.';
    }

    protected function getTableQuery(): Builder
    {
        return SiteVisit::query()->summarizedByDate();
    }

    public function getTableRecordKey(Model|array $record): string
    {
        if (is_array($record)) {
            return (string) ($record['visit_date'] ?? '');
        }

        return (string) $record->getAttribute('visit_date');
    }
}
