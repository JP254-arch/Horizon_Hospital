<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function index()
    {
        return MedicalRecord::with('patient', 'doctorProfile')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctor_profiles,id',
            'description' => 'required|string',
            'attachments' => 'nullable|string',
        ]);

        $record = MedicalRecord::create($data);
        return response()->json($record, 201);
    }

    public function show(MedicalRecord $medicalRecord)
    {
        return $medicalRecord->load('patient', 'doctorProfile');
    }

    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $data = $request->validate([
            'description' => 'sometimes|required|string',
            'attachments' => 'nullable|string',
        ]);

        $medicalRecord->update($data);
        return response()->json($medicalRecord);
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return response()->json(['message' => 'Medical record deleted successfully.']);
    }
}
