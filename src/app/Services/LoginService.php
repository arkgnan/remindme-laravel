<?php

namespace App\Services;

use App\Contracts\LoginInterface;
use App\Enums\TokenAbility;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class LoginService implements LoginInterface
{
    public function getUser(string $email, string $password): User
    {
        $user = User::where('email', $email)->first();
        $validCredentials = Hash::check($password, $user->getAuthPassword());
        if ($validCredentials) {
            return $user;
        } else {
            throw new \Exception('Not found');
        }
    }

    public function createToken(User $user): array
    {
        $accessToken = $user->createToken('access_token', [TokenAbility::ACCESS_API->value], Carbon::now()->addSeconds(20));
        $refreshToken = $user->createToken('refresh_token', [TokenAbility::ISSUE_ACCESS_TOKEN->value]);

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }
}
