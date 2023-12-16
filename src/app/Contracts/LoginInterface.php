<?php
namespace App\Contracts;

use App\Models\User;

interface LoginInterface
{
    public function getUser(String $email, String $password): User;
    public function createToken(User $user): Array;
}