<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'alice@mail.com'
        ],[
            'name' =>  'Alice',
            'email' => 'alice@mail.com',
            'password' => bcrypt('123456'),
            'email_verified_at' => now(),
        ]);
        User::updateOrCreate([
            'email' => 'bob@mail.com'
        ],[
            'name' =>  'Bob',
            'email' => 'bob@mail.com',
            'password' => bcrypt('123456'),
            'email_verified_at' => now(),
        ]);
    }
}
