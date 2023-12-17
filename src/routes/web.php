<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/reminders/{id}', function () {
    return Inertia::render('Reminder/View');
})->name('reminder');

Route::get('/remind-me/{id?}', function () {
    return Inertia::render('Reminder/Form');
})->name('reminder.form');

Route::get('login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
