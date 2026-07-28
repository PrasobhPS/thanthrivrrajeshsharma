<?php

use App\Http\Controllers\Api\GalleryPhotoController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ResearchFindingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\YantraController;
use App\Http\Controllers\Api\YoutubeVideoController;
use Illuminate\Support\Facades\Route;

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::get('/yantras', [YantraController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/research-findings', [ResearchFindingController::class, 'index']);
Route::get('/gallery', [GalleryPhotoController::class, 'index']);
Route::get('/youtube-videos', [YoutubeVideoController::class, 'index']);
Route::post('/inquiries', [InquiryController::class, 'store']);
