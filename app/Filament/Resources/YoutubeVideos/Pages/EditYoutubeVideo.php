<?php

namespace App\Filament\Resources\YoutubeVideos\Pages;

use App\Filament\Concerns\NormalizesYoutubeFormData;
use App\Filament\Resources\YoutubeVideos\YoutubeVideoResource;
use Filament\Resources\Pages\EditRecord;

class EditYoutubeVideo extends EditRecord
{
    use NormalizesYoutubeFormData;

    protected static string $resource = YoutubeVideoResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->normalizeYoutubeFormData($data);
    }
}
