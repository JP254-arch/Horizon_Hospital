<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StaffProfileController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Staff profile']);
    }

    public function update(Request $request)
    {
        return response()->json(['message' => 'Profile updated']);
    }
}
