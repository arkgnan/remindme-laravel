<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\LoginService;

class LoginController extends Controller
{
    /*
     * LoginService
     */
    private $loginService;

    /*
     * @var ReminderService $reminderService
     */
    public function __construct(
        LoginService $loginService
    ) {
        $this->loginService = $loginService;
    }

    public function generateToken(LoginRequest $request)
    {
        $request->validated();
        try {
            $user = $this->loginService->getUser($request->email, $request->password);
        } catch (\Exception $e) {
            abort(403);
        }
        $token = $this->loginService->createToken($user);

        return response()->json([
            'ok' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'access_token' => $token['access_token']->plainTextToken,
                'refresh_token' => $token['refresh_token']->plainTextToken,
            ],
        ], 200);
    }

    public function refreshToken()
    {
        $user = Auth()->user();
        $token = $this->loginService->createToken($user);

        return response()->json([
            'ok' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'access_token' => $token['access_token']->plainTextToken,
                'refresh_token' => $token['refresh_token']->plainTextToken,
            ],
        ], 200);
    }
}
