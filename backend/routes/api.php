<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorProfileController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DepartmentController; // Added for departments

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public test route
Route::get('/', function () {
    return response()->json(['message' => 'Welcome to Horizon Hospital API']);
});

Route::middleware([Cors::class])->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'Backend connected!']);
    });
});

// Protected routes with authentication
Route::middleware('auth:sanctum')->group(function () {

    // Patients
    Route::apiResource('patients', PatientController::class);

    // Doctors / Doctor Profiles
    Route::apiResource('doctor-profiles', DoctorProfileController::class);

    // Departments
    Route::apiResource('departments', DepartmentController::class);

    // Appointments
    Route::apiResource('appointments', AppointmentController::class);

    // Medical Records
    Route::apiResource('medical-records', MedicalRecordController::class);

    // Payments
    Route::apiResource('payments', PaymentController::class);
});
