<?php

namespace App\Filament\Resources\GuruPortraits\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GuruPortraitForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Label')
                    ->helperText('Optional name for your reference in the admin.')
                    ->maxLength(255),
                FileUpload::make('image_path')
                    ->label('Portrait')
                    ->disk('public')
                    ->directory('guru-portraits')
                    ->image()
                    ->imageEditor()
                    ->required(),
                TextInput::make('alt_text')
                    ->label('Alt text')
                    ->helperText('Used on the public site for accessibility.')
                    ->maxLength(255),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_default')
                    ->label('Default portrait')
                    ->helperText('The default image is shown in the About section on the website.'),
            ]);
    }
}
