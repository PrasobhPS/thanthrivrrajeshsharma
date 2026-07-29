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
        Schema::create('guru_profile_details', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('eyebrow')->nullable();
            $table->string('title_line_1')->nullable();
            $table->string('title_line_2')->nullable();
            $table->string('authority_label')->nullable();
            $table->text('authority_quote')->nullable();
            $table->string('verification_badge_label')->nullable();
            $table->string('verification_grade')->nullable();
            $table->string('tradition_seal_text')->nullable();
            $table->text('bio_lead')->nullable();
            $table->text('bio_description')->nullable();
            $table->string('stat_one_label')->nullable();
            $table->string('stat_one_value')->nullable();
            $table->string('stat_one_sublabel')->nullable();
            $table->string('stat_two_label')->nullable();
            $table->string('stat_two_value')->nullable();
            $table->string('stat_two_sublabel')->nullable();
            $table->string('consultation_status_text')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guru_profile_details');
    }
};
