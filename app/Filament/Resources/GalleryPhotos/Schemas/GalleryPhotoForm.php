<?php

namespace App\Filament\Resources\GalleryPhotos\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GalleryPhotoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('image_path')
                    ->label('Photo')
                    ->disk('public')
                    ->directory('gallery')
                    ->image()
                    ->imageEditor()
                    ->required(),
                TextInput::make('alt_text')
                    ->maxLength(255),
                TextInput::make('category')
                    ->maxLength(255),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label('Published')
                    ->default(true),
            ]);
    }
}
