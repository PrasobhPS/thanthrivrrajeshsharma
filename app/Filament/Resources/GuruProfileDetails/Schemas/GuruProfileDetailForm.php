<?php

namespace App\Filament\Resources\GuruProfileDetails\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GuruProfileDetailForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Label')
                    ->helperText('Optional name for your reference in the admin.')
                    ->maxLength(255),
                Section::make('Section header')
                    ->schema([
                        TextInput::make('eyebrow')
                            ->label('Eyebrow')
                            ->maxLength(255),
                        TextInput::make('title_line_1')
                            ->label('Title line 1')
                            ->maxLength(255),
                        TextInput::make('title_line_2')
                            ->label('Title line 2')
                            ->maxLength(255),
                        TextInput::make('authority_label')
                            ->label('Authority label')
                            ->maxLength(255),
                        Textarea::make('authority_quote')
                            ->label('Authority quote')
                            ->rows(2),
                    ])
                    ->columns(2),
                Section::make('Portrait overlays')
                    ->schema([
                        TextInput::make('verification_badge_label')
                            ->label('Verification badge label')
                            ->maxLength(255),
                        TextInput::make('verification_grade')
                            ->label('Verification grade')
                            ->helperText('Use a line break for a second line (e.g. "A+ Vedic" then "Grade").')
                            ->maxLength(255),
                        TextInput::make('tradition_seal_text')
                            ->label('Tradition seal text')
                            ->maxLength(255),
                    ])
                    ->columns(2),
                Section::make('Biography')
                    ->schema([
                        Textarea::make('bio_lead')
                            ->label('Lead paragraph')
                            ->rows(3),
                        Textarea::make('bio_description')
                            ->label('Description paragraph')
                            ->rows(4),
                    ]),
                Section::make('Statistics')
                    ->schema([
                        TextInput::make('stat_one_label')
                            ->label('Stat 1 label')
                            ->maxLength(255),
                        TextInput::make('stat_one_value')
                            ->label('Stat 1 value')
                            ->maxLength(255),
                        TextInput::make('stat_one_sublabel')
                            ->label('Stat 1 sublabel')
                            ->maxLength(255),
                        TextInput::make('stat_two_label')
                            ->label('Stat 2 label')
                            ->maxLength(255),
                        TextInput::make('stat_two_value')
                            ->label('Stat 2 value')
                            ->maxLength(255),
                        TextInput::make('stat_two_sublabel')
                            ->label('Stat 2 sublabel')
                            ->maxLength(255),
                    ])
                    ->columns(3),
                Section::make('Consultation bar')
                    ->schema([
                        TextInput::make('consultation_status_text')
                            ->label('Status text')
                            ->maxLength(255),
                    ]),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_default')
                    ->label('Default profile')
                    ->helperText('The default profile details are shown in the About section on the website.'),
            ]);
    }
}
