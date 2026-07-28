<?php

namespace App\Filament\Resources\ResearchFindings\Pages;

use App\Filament\Resources\ResearchFindings\ResearchFindingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditResearchFinding extends EditRecord
{
    protected static string $resource = ResearchFindingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
