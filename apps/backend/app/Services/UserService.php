<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Two\User as ProviderUser;

class UserService
{
    public function create(ProviderUser $providerUser): void
    {
        $email = $providerUser->getEmail();

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $providerUser->getName(),
                'email' => $email,
            ]
        );

        Auth::login($user);
    }

    public function authToken(): array
    {
        /** @var \App\Models\User * */
        $user = Auth::user();

        $user->tokens()->delete();
        $newToken = $user->createToken('UT-'.$user->id);

        return [
            'access_token' => $newToken->plainTextToken,
            'type' => 'Bearer'
        ];
    }
}
