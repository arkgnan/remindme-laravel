<?php
namespace App\Contracts;

use App\Models\Reminder;
use App\Models\User;

interface ReminderInterface
{
    public function list(User $user, Int $limit = 10): Array;
    public function create(Array $data): Reminder;
    public function view(Int $id): Reminder;
    public function edit(Int $id, Array $data): Reminder;
    public function delete(Int $id): Bool;
}