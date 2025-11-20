<?php

use App\Http\Controllers\Api\AspectRatioController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CreatorController;
use App\Http\Controllers\Api\ImageModelController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\VoiceModelController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1.0')->group(function () {
    Route::post('auth/{provider}/login', [AuthController::class, 'login']);

    Route::get('aspect-ratios', [AspectRatioController::class, 'index']);

    Route::prefix('models')->group(function () {
        Route::get('images', [ImageModelController::class, 'index']);
        Route::get('voices', [VoiceModelController::class, 'index']);
    });

    Route::get('tracks', [TrackController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('creators', CreatorController::class);
        Route::post('creators/{creator}/produce', [CreatorController::class, 'produce']);

        Route::apiResource('videos', VideoController::class);
        Route::post('videos/{video}/render', [VideoController::class, 'render']);
    });
});
