<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                FileUpload::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->directory('services')
                    ->image()
                    ->imageEditor(),
                Textarea::make('short_description')
                    ->maxLength(255)
                    ->rows(2),
                Textarea::make('description')
                    ->rows(5)
                    ->columnSpanFull(),
                TextInput::make('rate')
                    ->required()
                    ->numeric()
                    ->prefix('₹')
                    ->minValue(0),
                TextInput::make('duration')
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
