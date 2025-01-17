<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController
{

    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone_number' => 'required|string|unique:users,phone_number',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'phone_number' => $validated['phone_number'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during registration', 'error' => $e->getMessage()], 500);
        }
    }


    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['message' => 'Logged in successfully', 'token' => $token, 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during login', 'error' => $e->getMessage()], 500);
        }
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens->each(function ($token) {
                $token->delete();
            });

            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred during logout', 'error' => $e->getMessage()], 500);
        }
    }

    public function checkAuthStatus(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'ok' => false,
                'message' => 'Usuario no autenticado',
            ], 401);
        }

        return response()->json([
            'ok' => true,
            'user' => $user,
        ]);
    }

}