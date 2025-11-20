<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function login(Request $request, $provider)
    {
        try {
            $accessToken = $request->access_token;

            /** @disregard */
            $providerUser = Socialite::driver($provider)->userFromToken($accessToken);

        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ]);
        }

        $userService = new UserService;
        $token = $userService->create($providerUser);
        $token = $userService->authToken();

        return response()->json($token);
    }
}
