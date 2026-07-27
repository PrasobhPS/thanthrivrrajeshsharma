<?php

namespace App\Filament\Resources\YoutubeVideos;

use App\Filament\Resources\YoutubeVideos\Pages\CreateYoutubeVideo;
use App\Filament\Resources\YoutubeVideos\Pages\EditYoutubeVideo;
use App\Filament\Resources\YoutubeVideos\Pages\ListYoutubeVideos;
use App\Filament\Resources\YoutubeVideos\Schemas\YoutubeVideoForm;
use App\Filament\Resources\YoutubeVideos\Tables\YoutubeVideosTable;
use App\Models\YoutubeVideo as YoutubeVideoModel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class YoutubeVideoResource extends Resource
{
    protected static ?string $model = YoutubeVideoModel::class;

    protected static ?string $navigationLabel = 'YouTube videos';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPlayCircle;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return YoutubeVideoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return YoutubeVideosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListYoutubeVideos::route('/'),
            'create' => CreateYoutubeVideo::route('/create'),
            'edit' => EditYoutubeVideo::route('/{record}/edit'),
        ];
    }
}
