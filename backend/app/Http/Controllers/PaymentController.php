<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return Payment::with('patient')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'amount' => 'required|numeric',
            'status' => 'nullable|string',
            'method' => 'nullable|string',
            'details' => 'nullable|string',
        ]);

        $payment = Payment::create($data);
        return response()->json($payment, 201);
    }

    public function show(Payment $payment)
    {
        return $payment->load('patient');
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'amount' => 'sometimes|required|numeric',
            'status' => 'nullable|string',
            'method' => 'nullable|string',
            'details' => 'nullable|string',
        ]);

        $payment->update($data);
        return response()->json($payment);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully.']);
    }
}
