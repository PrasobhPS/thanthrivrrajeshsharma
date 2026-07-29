<?php

namespace Database\Seeders;

use App\Models\GalleryPhoto;
use App\Models\GuruProfileDetail;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Priest Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ],
        );

        $services = [
            [
                'name' => 'Ganesh Puja',
                'short_description' => 'Auspicious worship before new beginnings.',
                'description' => 'Traditional Ganesh Puja for homes, offices, businesses, and important life events.',
                'rate' => 2100,
                'duration' => '60 minutes',
            ],
            [
                'name' => 'Satyanarayan Katha',
                'short_description' => 'A devotional puja for peace and prosperity.',
                'description' => 'Complete Satyanarayan Katha with rituals, sankalp, aarti, and prasad guidance.',
                'rate' => 5100,
                'duration' => '2 hours',
            ],
            [
                'name' => 'Griha Pravesh Puja',
                'short_description' => 'Blessings for entering a new home.',
                'description' => 'Vastu shanti and Griha Pravesh rituals performed with proper vidhi.',
                'rate' => 7100,
                'duration' => '3 hours',
            ],
            [
                'name' => 'Mahamrityunjaya Jaap',
                'short_description' => 'Prayer for health, protection, and well-being.',
                'description' => 'Mahamrityunjaya mantra chanting and puja for healing and spiritual strength.',
                'rate' => 11000,
                'duration' => 'Half day',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::query()->updateOrCreate(
                ['slug' => Str::slug($service['name'])],
                [
                    ...$service,
                    'slug' => Str::slug($service['name']),
                    'display_order' => $index + 1,
                    'is_active' => true,
                ],
            );
        }

        $galleryPhotos = [
            ['Temple Lamps', 'gallery/gallery-lamps.png', 'Warm brass oil lamps'],
            ['Puja Thali', 'gallery/gallery-thali.png', 'Puja thali with flowers'],
            ['Family Ritual', 'gallery/gallery-family.png', 'Family participating in puja'],
            ['Flower Blessing', 'gallery/gallery-flowers.png', 'Hands offering flowers'],
        ];

        foreach ($galleryPhotos as $index => [$title, $imagePath, $altText]) {
            GalleryPhoto::query()->updateOrCreate(
                ['title' => $title],
                [
                    'image_path' => $imagePath,
                    'alt_text' => $altText,
                    'category' => 'Rituals',
                    'display_order' => $index + 1,
                    'is_active' => true,
                ],
            );
        }

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
