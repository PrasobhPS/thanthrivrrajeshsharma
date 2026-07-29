<?php

namespace App\Filament\Resources\GuruProfileDetails\Pages;

use App\Filament\Resources\GuruProfileDetails\GuruProfileDetailResource;
use Filament\Resources\Pages\ListRecords;

class ListGuruProfileDetails extends ListRecords
{
    protected static string $resource = GuruProfileDetailResource::class;
}
