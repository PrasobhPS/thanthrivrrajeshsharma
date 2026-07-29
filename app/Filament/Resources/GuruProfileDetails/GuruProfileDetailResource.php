<?php

namespace App\Filament\Resources\GuruProfileDetails;

use App\Filament\Resources\GuruProfileDetails\Pages\CreateGuruProfileDetail;
use App\Filament\Resources\GuruProfileDetails\Pages\EditGuruProfileDetail;
use App\Filament\Resources\GuruProfileDetails\Pages\ListGuruProfileDetails;
use App\Filament\Resources\GuruProfileDetails\Schemas\GuruProfileDetailForm;
use App\Filament\Resources\GuruProfileDetails\Tables\GuruProfileDetailsTable;
use App\Models\GuruProfileDetail;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class GuruProfileDetailResource extends Resource
{
    protected static ?string $model = GuruProfileDetail::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Guruji profile details';

    protected static ?string $modelLabel = 'Guruji profile detail';

    protected static ?string $pluralModelLabel = 'Guruji profile details';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return GuruProfileDetailForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GuruProfileDetailsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListGuruProfileDetails::route('/'),
            'create' => CreateGuruProfileDetail::route('/create'),
            'edit' => EditGuruProfileDetail::route('/{record}/edit'),
        ];
    }
}
