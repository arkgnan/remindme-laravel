<?php

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

it('can create a reminder', function () {
    $user = User::create([
        'email' => 'test@mail.com',
        'name' => 'test account',
        'password' => bcrypt('123456'),
    ]);
    $reminder = Reminder::create([
        'user_id' => $user->id,
        'title' => 'title event',
        'description' => 'detail of event',
        'remind_at' => 1701246722,
        'event_at' => 1701223200,
    ]);
    expect($user->email)->toBe('test@mail.com');
    expect($reminder->title)->toBe('title event');
    expect($reminder->remind_at)->toBe(1701246722);
});
