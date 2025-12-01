<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::with('patient', 'doctorProfile')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id'  => 'required|exists:doctor_profiles,id',
            'appointment_date' => 'required|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create($data);
        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment)
    {
        return $appointment->load('patient', 'doctorProfile');
    }

    public function update(Request $request, Appointment $appointment)
    {
        $data = $request->validate([
            'appointment_date' => 'sometimes|required|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($data);
        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json(['message' => 'Appointment deleted successfully.']);
    }
}
