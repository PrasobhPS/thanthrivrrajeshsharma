<?php

namespace App\Filament\Resources\SiteVisits\Tables;

use App\Filament\Resources\SiteVisits\SiteVisitResource;
use App\Models\SiteVisit;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\Indicator;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class SiteVisitsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('visit_date')
                    ->label('Date')
                    ->date()
                    ->sortable()
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        $date = static::parseSearchDate($search);

                        if ($date === null) {
                            return $query->whereRaw('0 = 1');
                        }

                        return $query->whereDate('visited_at', $date);
                    }),
                TextColumn::make('visits_count')
                    ->label('Visits')
                    ->numeric()
                    ->sortable(),
            ])
            ->defaultSort('visit_date', 'desc')
            ->defaultKeySort(false)
            ->splitSearchTerms(false)
            ->searchPlaceholder('Search by date')
            ->filters([
                Filter::make('visited_at')
                    ->label('Date')
                    ->columnSpanFull()
                    ->schema([
                        DatePicker::make('from')
                            ->label('From')
                            ->extraInputAttributes(['style' => 'min-width: 14rem']),
                        DatePicker::make('to')
                            ->label('To')
                            ->extraInputAttributes(['style' => 'min-width: 14rem']),
                    ])
                    ->columns(2)
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['from'] ?? null,
                                fn (Builder $query, string $date): Builder => $query->whereDate('visited_at', '>=', $date),
                            )
                            ->when(
                                $data['to'] ?? null,
                                fn (Builder $query, string $date): Builder => $query->whereDate('visited_at', '<=', $date),
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];

                        if (filled($data['from'] ?? null)) {
                            $indicators[] = Indicator::make('From '.Carbon::parse($data['from'])->toFormattedDateString())
                                ->removeField('from');
                        }

                        if (filled($data['to'] ?? null)) {
                            $indicators[] = Indicator::make('To '.Carbon::parse($data['to'])->toFormattedDateString())
                                ->removeField('to');
                        }

                        return $indicators;
                    }),
            ], layout: FiltersLayout::AboveContent)
            ->filtersFormColumns(1)
            ->recordActions([
                ViewAction::make()
                    ->url(fn (SiteVisit $record): string => SiteVisitResource::getUrl('view', [
                        'record' => $record->getAttribute('visit_date'),
                    ])),
            ]);
    }

    private static function parseSearchDate(string $search): ?string
    {
        $search = trim($search);

        foreach (['Y-m-d', 'd/m/Y', 'd-m-Y', 'M j, Y', 'F j, Y'] as $format) {
            if (! Carbon::hasFormat($search, $format)) {
                continue;
            }

            $parsed = Carbon::createFromFormat($format, $search);

            if ($parsed === false) {
                continue;
            }

            return $parsed->toDateString();
        }

        return null;
    }
}
