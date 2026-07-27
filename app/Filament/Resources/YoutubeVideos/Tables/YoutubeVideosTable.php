<?php

namespace App\Filament\Resources\YoutubeVideos\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class YoutubeVideosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('youtube_id')
                    ->label('Thumbnail')
                    ->square()
                    ->getStateUsing(fn ($record): string => $record->thumbnailUrl()),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('youtube_id')
                    ->label('Video ID')
                    ->searchable(),
                TextColumn::make('tag')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('display_order')
                    ->label('Order')
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Published')
                    ->boolean(),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Published'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
