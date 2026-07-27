<?php

namespace App\Filament\Resources\Yantras\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class YantrasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->square(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('details')
                    ->limit(40)
                    ->toggleable(),
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
