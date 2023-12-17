<?php

namespace Database\Factories;

use App\Models\Reminder;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reminder>
 */
class ReminderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Reminder::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create();
        $today = Carbon::now();

        return [
            'user_id' => 1,
            'title' => $faker->sentence,
            'description' => $faker->paragraph(),
            'remind_at' => $today->addDays(1)->timestamp,
            'event_at' => $today->addDays(2)->timestamp,
        ];
    }
}
