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
        Schema::create('research_findings', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code')->unique();
            $table->string('category');
            $table->string('title');
            $table->text('excerpt');
            $table->string('image_path');
            $table->date('published_at');
            $table->unsignedSmallInteger('read_time_minutes')->default(5);
            $table->json('tags')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research_findings');
    }
};
