<?php

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

it('does not create a reminder without a title field', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->postJson('/api/reminders', []);
    $response->assertStatus(400);
});

it('can create a reminder', function () {
    $user = User::factory()->create();
    $attributes = Reminder::factory()->raw();
    $response = $this->actingAs($user)->postJson('/api/reminders', $attributes);
    $response->assertStatus(200)->assertJson(['ok' => true]);
    $this->assertDatabaseHas('reminders', $attributes);
});

it('can fetch a reminder', function () {
    $user = User::factory()->create();
    $reminder = Reminder::factory()->create();

    $response = $this->actingAs($user)->getJson("/api/reminders/{$reminder->id}");

    $data = [
        'ok' => true,
        'data' => [
            'id' => $reminder->id,
            'title' => $reminder->title,
            'description' => $reminder->description,
            'remind_at' => $reminder->remind_at,
            'event_at' => $reminder->event_at,
        ],
    ];

    $response->assertStatus(200)->assertJson($data);
});

it('can update a reminder', function () {
    $user = User::factory()->create();
    $reminder = Reminder::factory()->create();
    $updatedReminder = ['title' => 'Updated reminder'];
    $response = $this->actingAs($user)->putJson("/api/reminders/{$reminder->id}", $updatedReminder);

    $data = [
        'ok' => true,
        'data' => [
            'id' => $reminder->id,
            'title' => $updatedReminder['title'],
            'description' => $reminder->description,
            'remind_at' => $reminder->remind_at,
            'event_at' => $reminder->event_at,
        ],
    ];
    $response->assertStatus(200)->assertJson($data);
    $this->assertDatabaseHas('reminders', $updatedReminder);
});

it('can delete a reminder', function () {
    $user = User::factory()->create();
    $reminder = Reminder::factory()->create();
    $response = $this->actingAs($user)->deleteJson("/api/reminders/{$reminder->id}");
    $response->assertStatus(200)->assertJson(['ok' => true]);
    $this->assertCount(0, Reminder::all());
});
