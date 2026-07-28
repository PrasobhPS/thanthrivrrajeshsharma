<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guru_portraits', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('image_path');
            $table->string('alt_text')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_default')->default(false);
            $table->timestamps();

            $table->index(['is_default', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guru_portraits');
    }
};
