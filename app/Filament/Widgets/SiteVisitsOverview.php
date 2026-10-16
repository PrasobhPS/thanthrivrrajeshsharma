<?php

namespace App\Filament\Widgets;

use App\Models\SiteVisit;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SiteVisitsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = -4;

    protected ?string $heading = 'Site visits';

    protected ?string $description = 'Each browser session on the public site counts as one visit.';

    protected function getStats(): array
    {
        return [
            Stat::make('Total visits', number_format(SiteVisit::query()->count()))
                ->description('All recorded visits')
                ->chart(SiteVisit::dailyCounts(7))
                ->icon('heroicon-o-eye'),
            Stat::make('Today', number_format(SiteVisit::countSince(now()->startOfDay())))
                ->description('Since midnight')
                ->icon('heroicon-o-calendar'),
            Stat::make('This month', number_format(SiteVisit::countSince(now()->startOfMonth())))
                ->description(now()->format('F Y'))
                ->icon('heroicon-o-chart-bar'),
        ];
    }
}
