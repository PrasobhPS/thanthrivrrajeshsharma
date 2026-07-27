<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use App\Models\Inquiry;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class InquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('status')
                    ->required()
                    ->options([
                        Inquiry::STATUS_NEW => 'New',
                        Inquiry::STATUS_CONTACTED => 'Contacted',
                        Inquiry::STATUS_COMPLETED => 'Completed',
                    ])
                    ->default(Inquiry::STATUS_NEW),
                Select::make('service_id')
                    ->relationship('service', 'name')
                    ->searchable()
                    ->preload(),
                TextInput::make('requested_service')
                    ->maxLength(255),
                DatePicker::make('requested_date'),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('phone')
                    ->required()
                    ->tel()
                    ->maxLength(30),
                TextInput::make('email')
                    ->email()
                    ->maxLength(255),
                Textarea::make('message')
                    ->rows(5)
                    ->columnSpanFull(),
            ]);
    }
}
