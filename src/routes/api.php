<?php

use App\Http\Controllers\Rest\LoginController;
use App\Http\Controllers\Rest\ReminderController;
use Illuminate\Support\Facades\Route;

Route::post('session', [LoginController::class, 'generateToken']);
Route::group([
    'middleware' => ['api', 'auth:sanctum']
], function ($router) {
    Route::put('session', [LoginController::class, 'refreshToken']);
    Route::apiResource('reminders', ReminderController::class);
});
