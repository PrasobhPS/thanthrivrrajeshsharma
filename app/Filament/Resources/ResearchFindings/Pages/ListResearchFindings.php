<?php

namespace App\Filament\Resources\ResearchFindings\Pages;

use App\Filament\Resources\ResearchFindings\ResearchFindingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListResearchFindings extends ListRecords
{
    protected static string $resource = ResearchFindingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
