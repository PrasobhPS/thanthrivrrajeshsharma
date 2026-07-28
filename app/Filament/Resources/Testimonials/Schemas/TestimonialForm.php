<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('quote')
                    ->required()
                    ->rows(5)
                    ->columnSpanFull(),
                TextInput::make('author_name')
                    ->label('Author name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('author_city')
                    ->label('City')
                    ->maxLength(255),
                TextInput::make('author_role')
                    ->label('Role / title')
                    ->maxLength(255),
                TextInput::make('tag')
                    ->label('Protocol tag')
                    ->helperText('Shown as “{tag} Protocol” on the site (e.g. Astro-Logic).')
                    ->maxLength(255),
                FileUpload::make('image_path')
                    ->label('Portal image')
                    ->disk('public')
                    ->directory('testimonials')
                    ->image()
                    ->imageEditor()
                    ->required(),
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
