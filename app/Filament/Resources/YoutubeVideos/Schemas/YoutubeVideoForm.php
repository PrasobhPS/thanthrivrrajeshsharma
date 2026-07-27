<?php

namespace App\Filament\Resources\YoutubeVideos\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class YoutubeVideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('youtube_id')
                    ->label('YouTube URL or video ID')
                    ->required()
                    ->maxLength(512)
                    ->helperText('Paste a watch link, youtu.be short link, or the 11-character video ID (e.g. from Thanthri V R Rajesh Sharmma\'s channel).'),
                TextInput::make('tag')
                    ->maxLength(255)
                    ->placeholder('e.g. Teaching, Live'),
                TextInput::make('channel_label')
                    ->label('Channel / author line')
                    ->maxLength(255)
                    ->default('Thanthri V R Rajesh Sharmma'),
                TextInput::make('meta_line')
                    ->label('Subtitle line')
                    ->maxLength(255)
                    ->placeholder('Optional — e.g. views or date text'),
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
