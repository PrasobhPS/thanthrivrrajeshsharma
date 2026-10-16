<?php

use App\Http\Middleware\RecordSiteVisit;
use Illuminate\Support\Facades\Route;

Route::middleware(RecordSiteVisit::class)->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/{any}', function () {
        return view('welcome');
    })->where('any', '^(?!admin|api).*$');
});

