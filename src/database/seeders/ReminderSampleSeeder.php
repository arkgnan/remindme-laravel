<?php

namespace Database\Seeders;

use App\Models\Reminder;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReminderSampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::get();
        $today = Carbon::now();
        foreach ($users as $user) {
            DB::beginTransaction();
            try {
                for ($i = 1; $i <= 10; $i++) {
                    Reminder::create([
                        'user_id' => $user->id,
                        'title' => $faker->sentence,
                        'description' => $faker->paragraph(),
                        'remind_at' => $today->addDays($i - 1)->timestamp,
                        'event_at' => $today->addDays($i)->timestamp,
                    ]);
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
            }
        }
    }
}
