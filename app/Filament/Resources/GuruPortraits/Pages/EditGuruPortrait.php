<?php

namespace App\Filament\Resources\GuruPortraits\Pages;

use App\Filament\Resources\GuruPortraits\GuruPortraitResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditGuruPortrait extends EditRecord
{
    protected static string $resource = GuruPortraitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
