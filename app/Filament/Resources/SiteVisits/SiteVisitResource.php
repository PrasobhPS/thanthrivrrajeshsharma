<?php

namespace App\Filament\Resources\SiteVisits;

use App\Filament\Resources\SiteVisits\Pages\ListSiteVisits;
use App\Filament\Resources\SiteVisits\Pages\ViewSiteVisit;
use App\Filament\Resources\SiteVisits\Tables\SiteVisitsTable;
use App\Models\SiteVisit;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class SiteVisitResource extends Resource
{
    protected static ?string $model = SiteVisit::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEye;

    protected static ?string $navigationLabel = 'Site visits';

    protected static ?string $modelLabel = 'site visit';

    protected static ?string $pluralModelLabel = 'site visits';

    protected static ?int $navigationSort = -1;

    public static function table(Table $table): Table
    {
        return SiteVisitsTable::configure($table);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canDeleteAny(): bool
    {
        return false;
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSiteVisits::route('/'),
            'view' => ViewSiteVisit::route('/{record}'),
        ];
    }
}
