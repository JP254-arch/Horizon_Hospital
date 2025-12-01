<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name'  => 'required|string',
            'email'      => 'required|email|unique:patients,email',
            'phone'      => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender'     => 'nullable|string',
            'address'    => 'nullable|string',
        ]);

        $patient = Patient::create($data);
        return response()->json($patient, 201);
    }

    public function show(Patient $patient)
    {
        return $patient;
    }

    public function update(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string',
            'last_name'  => 'sometimes|required|string',
            'email'      => 'sometimes|required|email|unique:patients,email,' . $patient->id,
            'phone'      => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender'     => 'nullable|string',
            'address'    => 'nullable|string',
        ]);

        $patient->update($data);
        return response()->json($patient);
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json(['message' => 'Patient deleted successfully.']);
    }
}
