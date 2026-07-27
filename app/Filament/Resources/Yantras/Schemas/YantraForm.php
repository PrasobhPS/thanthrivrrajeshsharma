<?php

namespace App\Filament\Resources\Yantras\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class YantraForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->directory('yantras')
                    ->image()
                    ->imageEditor()
                    ->required(),
                Textarea::make('details')
                    ->rows(5)
                    ->columnSpanFull(),
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
