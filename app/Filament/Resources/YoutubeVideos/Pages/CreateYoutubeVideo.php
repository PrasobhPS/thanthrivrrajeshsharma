<?php

namespace App\Filament\Resources\YoutubeVideos\Pages;

use App\Filament\Concerns\NormalizesYoutubeFormData;
use App\Filament\Resources\YoutubeVideos\YoutubeVideoResource;
use Filament\Resources\Pages\CreateRecord;

class CreateYoutubeVideo extends CreateRecord
{
    use NormalizesYoutubeFormData;

    protected static string $resource = YoutubeVideoResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->normalizeYoutubeFormData($data);
    }
}
