<?php

namespace App\Filament\Resources\Yantras\Pages;

use App\Filament\Resources\Yantras\YantraResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditYantra extends EditRecord
{
    protected static string $resource = YantraResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
