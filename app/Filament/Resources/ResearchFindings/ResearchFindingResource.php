<?php

namespace App\Filament\Resources\ResearchFindings;

use App\Filament\Resources\ResearchFindings\Pages\CreateResearchFinding;
use App\Filament\Resources\ResearchFindings\Pages\EditResearchFinding;
use App\Filament\Resources\ResearchFindings\Pages\ListResearchFindings;
use App\Filament\Resources\ResearchFindings\Schemas\ResearchFindingForm;
use App\Filament\Resources\ResearchFindings\Tables\ResearchFindingsTable;
use App\Models\ResearchFinding;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ResearchFindingResource extends Resource
{
    protected static ?string $model = ResearchFinding::class;

    protected static ?string $navigationLabel = 'Journal';

    protected static ?string $modelLabel = 'research finding';

    protected static ?string $pluralModelLabel = 'research findings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ResearchFindingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResearchFindingsTable::configure($table);
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
            'index' => ListResearchFindings::route('/'),
            'create' => CreateResearchFinding::route('/create'),
            'edit' => EditResearchFinding::route('/{record}/edit'),
        ];
    }
}
