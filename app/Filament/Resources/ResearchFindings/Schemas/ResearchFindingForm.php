<?php

namespace App\Filament\Resources\ResearchFindings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ResearchFindingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('reference_code')
                    ->label('Protocol ID')
                    ->helperText('Shown on the site (e.g. J-27).')
                    ->required()
                    ->maxLength(32)
                    ->unique(ignoreRecord: true),
                TextInput::make('category')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('Sonic Science'),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Textarea::make('excerpt')
                    ->label('Summary quote')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),
                FileUpload::make('image_path')
                    ->label('Preview image')
                    ->disk('public')
                    ->directory('research-findings')
                    ->image()
                    ->imageEditor()
                    ->required(),
                DatePicker::make('published_at')
                    ->label('Publication date')
                    ->required()
                    ->default(now()),
                TextInput::make('read_time_minutes')
                    ->label('Read time (minutes)')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(999)
                    ->default(7),
                TextInput::make('tags')
                    ->label('Tags')
                    ->helperText('Comma-separated (e.g. Acoustics, Physics, Healing).')
                    ->formatStateUsing(function ($state): string {
                        if (is_array($state)) {
                            return implode(', ', $state);
                        }

                        return (string) ($state ?? '');
                    })
                    ->dehydrateStateUsing(function (?string $state): array {
                        if ($state === null || trim($state) === '') {
                            return [];
                        }

                        return array_values(array_filter(array_map(
                            static fn (string $tag): string => trim($tag),
                            explode(',', $state),
                        )));
                    })
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
