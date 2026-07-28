<?php

namespace Tests\Feature;

use App\Models\GalleryPhoto;
use App\Models\GuruPortrait;
use App\Models\Inquiry;
use App\Models\ResearchFinding;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\YoutubeVideo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        if (! extension_loaded('pdo_sqlite')) {
            $this->markTestSkipped('The pdo_sqlite extension is required for isolated API tests.');
        }

        parent::setUp();
    }

    public function test_it_lists_active_services(): void
    {
        Service::query()->create([
            'name' => 'Ganesh Puja',
            'slug' => 'ganesh-puja',
            'short_description' => 'Auspicious worship before new beginnings.',
            'rate' => 2100,
            'display_order' => 1,
            'is_active' => true,
        ]);

        Service::query()->create([
            'name' => 'Hidden Puja',
            'slug' => 'hidden-puja',
            'rate' => 1000,
            'is_active' => false,
        ]);

        $this->getJson('/api/services')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Ganesh Puja')
            ->assertJsonMissingPath('data.1');
    }

    public function test_it_lists_active_youtube_videos(): void
    {
        YoutubeVideo::query()->create([
            'title' => 'Sample teaching',
            'youtube_id' => 'a1b2c3d4e5x',
            'tag' => 'Teaching',
            'channel_label' => 'Thanthri V R Rajesh Sharmma',
            'display_order' => 1,
            'is_active' => true,
        ]);

        YoutubeVideo::query()->create([
            'title' => 'Unlisted',
            'youtube_id' => 'abcdefghijk',
            'display_order' => 2,
            'is_active' => false,
        ]);

        $this->getJson('/api/youtube-videos')
            ->assertOk()
            ->assertJsonPath('data.0.title', 'Sample teaching')
            ->assertJsonPath('data.0.youtube_id', 'a1b2c3d4e5x')
            ->assertJsonPath('data.0.watch_url', 'https://www.youtube.com/watch?v=a1b2c3d4e5x')
            ->assertJsonMissingPath('data.1');
    }

    public function test_it_lists_active_gallery_photos(): void
    {
        GalleryPhoto::query()->create([
            'title' => 'Temple Lamps',
            'image_path' => 'gallery/sample-1.svg',
            'alt_text' => 'Temple lamps',
            'category' => 'Rituals',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $this->getJson('/api/gallery')
            ->assertOk()
            ->assertJsonPath('data.0.title', 'Temple Lamps')
            ->assertJsonPath('data.0.image_url', 'http://localhost/storage/gallery/sample-1.svg');
    }

    public function test_it_returns_the_default_guru_portrait(): void
    {
        GuruPortrait::query()->create([
            'title' => 'Secondary',
            'image_path' => 'guru-portraits/secondary.jpg',
            'display_order' => 2,
            'is_default' => false,
        ]);

        GuruPortrait::query()->create([
            'title' => 'Primary',
            'image_path' => 'guru-portraits/primary.jpg',
            'alt_text' => 'Guruji portrait',
            'display_order' => 1,
            'is_default' => true,
        ]);

        $this->getJson('/api/guru-portraits/default')
            ->assertOk()
            ->assertJsonPath('data.title', 'Primary')
            ->assertJsonPath('data.is_default', true)
            ->assertJsonPath('data.image_url', 'http://localhost/storage/guru-portraits/primary.jpg');

        $this->getJson('/api/guru-portraits')
            ->assertOk()
            ->assertJsonPath('data.0.title', 'Primary')
            ->assertJsonPath('meta.total', 2);
    }

    public function test_it_lists_active_research_findings(): void
    {
        ResearchFinding::query()->create([
            'reference_code' => 'J-26',
            'category' => 'Sonic Science',
            'title' => 'Mantra Resonance & Cellular Calibration',
            'excerpt' => 'The intersection of Vedic chanting and quantum physics.',
            'image_path' => 'research-findings/sample.jpg',
            'published_at' => '2024-05-04',
            'read_time_minutes' => 7,
            'tags' => ['Acoustics', 'Physics'],
            'display_order' => 1,
            'is_active' => true,
        ]);

        ResearchFinding::query()->create([
            'reference_code' => 'J-99',
            'category' => 'Draft',
            'title' => 'Unpublished',
            'excerpt' => 'Hidden.',
            'image_path' => 'research-findings/hidden.jpg',
            'published_at' => '2024-01-01',
            'read_time_minutes' => 5,
            'display_order' => 2,
            'is_active' => false,
        ]);

        $this->getJson('/api/research-findings')
            ->assertOk()
            ->assertJsonPath('data.0.reference_code', 'J-26')
            ->assertJsonPath('data.0.title', 'Mantra Resonance & Cellular Calibration')
            ->assertJsonPath('data.0.tags.0', 'Acoustics')
            ->assertJsonPath('data.0.image_url', 'http://localhost/storage/research-findings/sample.jpg')
            ->assertJsonMissingPath('data.1');
    }

    public function test_it_lists_active_testimonials(): void
    {
        Testimonial::query()->create([
            'quote' => 'A profound session.',
            'author_name' => 'Akhil Raj Narayan',
            'author_role' => 'Tech Founder',
            'author_city' => 'Mumbai',
            'tag' => 'Astro-Logic',
            'image_path' => 'testimonials/sample.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);

        Testimonial::query()->create([
            'quote' => 'Hidden story.',
            'author_name' => 'Private Devotee',
            'image_path' => 'testimonials/hidden.jpg',
            'display_order' => 2,
            'is_active' => false,
        ]);

        $this->getJson('/api/testimonials')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Akhil Raj Narayan')
            ->assertJsonPath('data.0.quote', 'A profound session.')
            ->assertJsonPath('data.0.tag', 'Astro-Logic')
            ->assertJsonPath('data.0.image_url', 'http://localhost/storage/testimonials/sample.jpg')
            ->assertJsonMissingPath('data.1');
    }

    public function test_it_stores_a_valid_inquiry(): void
    {
        $service = Service::query()->create([
            'name' => 'Satyanarayan Katha',
            'slug' => 'satyanarayan-katha',
            'rate' => 5100,
            'is_active' => true,
        ]);

        $this->postJson('/api/inquiries', [
            'name' => 'Devotee Name',
            'phone' => '9999999999',
            'email' => 'devotee@example.com',
            'service_id' => $service->id,
            'requested_date' => now()->addDay()->toDateString(),
            'message' => 'Please share available timing.',
        ])
            ->assertCreated()
            ->assertJsonPath('data.status', Inquiry::STATUS_NEW);

        $this->assertDatabaseHas('inquiries', [
            'name' => 'Devotee Name',
            'service_id' => $service->id,
            'status' => Inquiry::STATUS_NEW,
        ]);
    }

    public function test_it_rejects_invalid_inquiry_payloads(): void
    {
        $this->postJson('/api/inquiries', [
            'name' => '',
            'phone' => '',
            'requested_date' => now()->subDay()->toDateString(),
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'phone', 'requested_date']);
    }
}
