<?php

namespace App\Filament\Resources\GuruPortraits;

use App\Filament\Resources\GuruPortraits\Pages\CreateGuruPortrait;
use App\Filament\Resources\GuruPortraits\Pages\EditGuruPortrait;
use App\Filament\Resources\GuruPortraits\Pages\ListGuruPortraits;
use App\Filament\Resources\GuruPortraits\Schemas\GuruPortraitForm;
use App\Filament\Resources\GuruPortraits\Tables\GuruPortraitsTable;
use App\Models\GuruPortrait;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class GuruPortraitResource extends Resource
{
    protected static ?string $model = GuruPortrait::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserCircle;

    protected static ?string $navigationLabel = 'Guruji portraits';

    protected static ?string $modelLabel = 'Guruji portrait';

    protected static ?string $pluralModelLabel = 'Guruji portraits';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return GuruPortraitForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GuruPortraitsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListGuruPortraits::route('/'),
            'create' => CreateGuruPortrait::route('/create'),
            'edit' => EditGuruPortrait::route('/{record}/edit'),
        ];
    }
}
