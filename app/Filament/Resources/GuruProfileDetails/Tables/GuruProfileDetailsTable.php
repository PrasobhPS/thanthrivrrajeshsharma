<?php

namespace App\Filament\Resources\GuruProfileDetails\Tables;

use App\Models\GuruProfileDetail;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class GuruProfileDetailsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->placeholder('—')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title_line_1')
                    ->label('Headline')
                    ->formatStateUsing(fn (GuruProfileDetail $record): string => trim("{$record->title_line_1} {$record->title_line_2}"))
                    ->searchable(['title_line_1', 'title_line_2']),
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
                    ->visible(fn (GuruProfileDetail $record): bool => ! $record->is_default)
                    ->action(function (GuruProfileDetail $record): void {
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
