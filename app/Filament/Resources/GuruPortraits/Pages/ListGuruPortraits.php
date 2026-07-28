<?php

namespace App\Filament\Resources\GuruPortraits\Pages;

use App\Filament\Resources\GuruPortraits\GuruPortraitResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListGuruPortraits extends ListRecords
{
    protected static string $resource = GuruPortraitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
