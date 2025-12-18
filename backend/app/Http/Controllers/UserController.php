<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // List all users (admin only)
    public function index()
    {
        return response()->json(User::all());
    }

    // Store a new user (admin)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:ADMIN,PATIENT,DEPARTMENT_MEMBER',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $user = User::create($request->all());

        if ($user->role === 'PATIENT') {
            $user->patient()->create([]);
        }

        return response()->json($user, 201);
    }

    // Show single user
    public function show(User $user)
    {
        return response()->json($user);
    }

    // Update user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:6',
            'role' => 'sometimes|required|string|in:ADMIN,PATIENT,DEPARTMENT_MEMBER',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $user->update($request->all());

        return response()->json($user);
    }

    // Delete user
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
