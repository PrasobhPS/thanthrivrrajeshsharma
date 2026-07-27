<?php

namespace App\Filament\Resources\Yantras;

use App\Filament\Resources\Yantras\Pages\CreateYantra;
use App\Filament\Resources\Yantras\Pages\EditYantra;
use App\Filament\Resources\Yantras\Pages\ListYantras;
use App\Filament\Resources\Yantras\Schemas\YantraForm;
use App\Filament\Resources\Yantras\Tables\YantrasTable;
use App\Models\Yantra;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class YantraResource extends Resource
{
    protected static ?string $model = Yantra::class;

    protected static ?string $navigationLabel = 'Yantras';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSparkles;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return YantraForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return YantrasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListYantras::route('/'),
            'create' => CreateYantra::route('/create'),
            'edit' => EditYantra::route('/{record}/edit'),
        ];
    }
}
