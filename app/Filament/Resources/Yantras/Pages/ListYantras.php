<?php

namespace App\Filament\Resources\Yantras\Pages;

use App\Filament\Resources\Yantras\YantraResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListYantras extends ListRecords
{
    protected static string $resource = YantraResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
