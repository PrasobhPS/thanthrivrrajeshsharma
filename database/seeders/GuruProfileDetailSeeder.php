<?php

namespace Database\Seeders;

use App\Models\GuruProfileDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuruProfileDetailSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the default Guruji profile details for the About section.
     */
    public function run(): void
    {
        GuruProfileDetail::query()->updateOrCreate(
            ['title' => 'Default profile'],
            [
                'eyebrow' => 'The Master Narrative',
                'title_line_1' => 'The Guardian of',
                'title_line_2' => 'Unbroken Tradition',
                'authority_label' => 'Traditional Authority',
                'authority_quote' => 'Decoding the intersection of sacred geometry and modern existence.',
                'verification_badge_label' => 'Verified',
                'verification_grade' => "A+ Vedic\nGrade",
                'tradition_seal_text' => 'Est · 1997 · Ancient · Physics',
                'bio_lead' => 'Thanthri V R Rajesh Sharmma represents a 1,000-year legacy of Tantric mastery, re-engineered for the modern seeker.',
                'bio_description' => 'His research into the mathematical logic of Vedic rituals has transformed the lives of over 12,000 devotees worldwide, blending deep meditative sadhana with a relentless pursuit of spiritual truth.',
                'stat_one_label' => 'The Sadhana',
                'stat_one_value' => '27+ Years',
                'stat_one_sublabel' => 'Intensive Research',
                'stat_two_label' => 'The Impact',
                'stat_two_value' => '12,000+',
                'stat_two_sublabel' => 'Souls Guided',
                'consultation_status_text' => 'Daily Consultation Portal: Active',
                'display_order' => 1,
                'is_default' => true,
            ],
        );
    }
}
