<?php

use App\Http\Controllers\Rest\LoginController;
use App\Http\Controllers\Rest\ReminderController;
use Illuminate\Support\Facades\Route;

Route::post('session', [LoginController::class, 'generateToken'])->name('generate.token');
Route::group([
    'middleware' => ['auth:sanctum'],
], function () {
    Route::put('session', [LoginController::class, 'refreshToken'])->name('refresh.token');
    Route::apiResource('reminders', ReminderController::class);
});
