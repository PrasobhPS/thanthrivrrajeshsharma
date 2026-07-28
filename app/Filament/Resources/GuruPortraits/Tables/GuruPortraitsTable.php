<?php

namespace App\Filament\Resources\GuruPortraits\Tables;

use App\Models\GuruPortrait;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class GuruPortraitsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')
                    ->label('Portrait')
                    ->disk('public')
                    ->square(),
                TextColumn::make('title')
                    ->placeholder('—')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('is_default')
                    ->label('Default')
                    ->boolean(),
                TextColumn::make('display_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('display_order')
            ->recordActions([
                Action::make('setDefault')
                    ->label('Set as default')
                    ->icon('heroicon-o-star')
                    ->visible(fn (GuruPortrait $record): bool => ! $record->is_default)
                    ->action(function (GuruPortrait $record): void {
                        $record->forceFill(['is_default' => true])->save();
                    }),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
