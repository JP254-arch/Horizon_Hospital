<?php

namespace App\Http\Controllers;

use App\Models\DoctorProfile;
use Illuminate\Http\Request;

class DoctorProfileController extends Controller
{
    public function index()
    {
        return DoctorProfile::with('user', 'department')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialization' => 'required|string',
            'phone' => 'nullable|string',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $doctor = DoctorProfile::create($data);
        return response()->json($doctor, 201);
    }

    public function show(DoctorProfile $doctorProfile)
    {
        return $doctorProfile->load('user', 'department');
    }

    public function update(Request $request, DoctorProfile $doctorProfile)
    {
        $data = $request->validate([
            'specialization' => 'sometimes|required|string',
            'phone' => 'nullable|string',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $doctorProfile->update($data);
        return response()->json($doctorProfile);
    }

    public function destroy(DoctorProfile $doctorProfile)
    {
        $doctorProfile->delete();
        return response()->json(['message' => 'Doctor profile deleted successfully.']);
    }
}
