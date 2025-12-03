<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorProfileController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group. They automatically
| have "/api" prefixed in the URL.
|
*/

// -------------------------
// PUBLIC ROUTES
// -------------------------
Route::get('/', function () {
    return response()->json(['message' => 'Welcome to Horizon Hospital API']);
});

// Register & Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Simple test route with CORS
Route::middleware([Cors::class])->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'Backend connected!']);
    });
});

// -------------------------
// PROTECTED ROUTES (AUTHENTICATED)
// -------------------------
Route::middleware(['auth:sanctum'])->group(function () {

    // PATIENT ROUTES
    Route::middleware('role:patient')->group(function () {
        Route::apiResource('patients', PatientController::class);
        Route::apiResource('appointments', AppointmentController::class);
    });

    // DOCTOR ROUTES
    Route::middleware('role:doctor')->group(function () {
        Route::apiResource('doctor-profiles', DoctorProfileController::class);
        Route::apiResource('medical-records', MedicalRecordController::class);
    });

    // ADMIN ROUTES
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('departments', DepartmentController::class);
        Route::apiResource('payments', PaymentController::class);
    });

    // MULTI-ROLE ROUTE (doctor OR admin)
    Route::middleware('role:doctor,admin')->group(function () {
        Route::get('/reports', function () {
            return response()->json(['message' => 'Reports accessible by doctor or admin']);
        });
    });
});
