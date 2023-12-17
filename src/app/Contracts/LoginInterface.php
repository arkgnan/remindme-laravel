<?php

namespace App\Contracts;

use App\Models\User;

interface LoginInterface
{
    public function getUser(string $email, string $password): User;

    public function createToken(User $user): array;
}
