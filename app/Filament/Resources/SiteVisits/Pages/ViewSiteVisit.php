<?php

namespace App\Filament\Resources\SiteVisits\Pages;

use App\Filament\Resources\SiteVisits\SiteVisitResource;
use App\Models\SiteVisit;
use Filament\Resources\Pages\Page;
use Filament\Schemas\Components\EmbeddedTable;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class ViewSiteVisit extends Page implements HasTable
{
    use InteractsWithTable;

    protected static string $resource = SiteVisitResource::class;

    protected static bool $shouldRegisterNavigation = false;

    public string $visitDate;

    public function mount(string $record): void
    {
        abort_unless(preg_match('/^\d{4}-\d{2}-\d{2}$/', $record) === 1, 404);

        abort_unless(
            SiteVisit::query()->whereDate('visited_at', $record)->exists(),
            404,
        );

        $this->visitDate = $record;
    }

    public function getTitle(): string|Htmlable
    {
        return Carbon::parse($this->visitDate)->format('F j, Y');
    }

    public function getSubheading(): string|Htmlable|null
    {
        $count = SiteVisit::query()->whereDate('visited_at', $this->visitDate)->count();

        return $count === 1 ? '1 visit' : "{$count} visits";
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => SiteVisit::query()->whereDate('visited_at', $this->visitDate))
            ->columns([
                TextColumn::make('visited_at')
                    ->label('Time')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('path')
                    ->label('Page'),
            ])
            ->defaultSort('visited_at', 'desc');
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            EmbeddedTable::make(),
        ]);
    }
}
