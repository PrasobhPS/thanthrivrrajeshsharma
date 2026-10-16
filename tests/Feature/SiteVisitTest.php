<?php

namespace Tests\Feature;

use App\Filament\Widgets\SiteVisitsOverview;
use App\Models\SiteVisit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class SiteVisitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        if (! extension_loaded('pdo_sqlite')) {
            $this->markTestSkipped('The pdo_sqlite extension is required for isolated API tests.');
        }

        parent::setUp();
    }

    public function test_a_public_page_view_is_counted_once_per_session(): void
    {
        $this->get('/')->assertOk();
        $this->get('/about')->assertOk();

        $this->assertSame(1, SiteVisit::query()->count());
        $this->assertSame('/', SiteVisit::query()->value('path'));
    }

    public function test_a_new_session_is_counted_as_another_visit(): void
    {
        $this->get('/')->assertOk();
        $this->flushSession();
        $this->get('/')->assertOk();

        $this->assertSame(2, SiteVisit::query()->count());
    }

    public function test_admin_and_api_requests_are_not_counted(): void
    {
        $this->get('/admin')->assertRedirect();
        $this->getJson('/api/services')->assertOk();

        $this->assertSame(0, SiteVisit::query()->count());
    }

    public function test_bots_prefetches_and_asset_requests_are_not_counted(): void
    {
        $this->withHeader('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
            ->get('/')
            ->assertOk();

        $this->flushSession();

        $this->withHeader('Purpose', 'prefetch')
            ->get('/')
            ->assertOk();

        $this->flushSession();

        $this->get('/favicon.ico')->assertOk();

        $this->assertSame(0, SiteVisit::query()->count());
    }

    public function test_the_admin_dashboard_shows_visit_counts(): void
    {
        SiteVisit::query()->create([
            'path' => '/',
            'visited_at' => now(),
        ]);

        SiteVisit::query()->create([
            'path' => '/about',
            'visited_at' => now()->subMonth(),
        ]);

        Livewire::test(SiteVisitsOverview::class)
            ->assertSee('Site visits')
            ->assertSee('Total visits')
            ->assertSee('2')
            ->assertSee('Today')
            ->assertSee('1')
            ->assertSee('This month');
    }
}
