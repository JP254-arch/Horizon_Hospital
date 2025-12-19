<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\StaffProfileController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

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

Route::middleware('auth:sanctum')->get('/auth-test', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
    ]);
});


// -------------------------
// PUBLIC ROUTES
// -------------------------
Route::get('/', function () {
    return response()->json(['message' => 'Welcome to Horizon Hospital API']);
});

// Auth: Register & Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Auth: Logout & Me (requires auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

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

    // -------------------------
    // PATIENT ROUTES
    // -------------------------
    Route::middleware('role:patient')->group(function () {
        Route::apiResource('patients', PatientController::class);
        Route::apiResource('appointments', AppointmentController::class);
        Route::get('/medical-records/my', [MedicalRecordController::class, 'myRecords']);
    });

    // -------------------------
    // STAFF ROUTES
    // -------------------------
    Route::middleware('role:staff')->group(function () {
        Route::apiResource('staff-profiles', StaffProfileController::class);
        Route::apiResource('medical-records', MedicalRecordController::class);
    });

    // -------------------------
    // ADMIN ROUTES
    // -------------------------
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('payments', PaymentController::class);
        Route::get('/patients/all', [PatientController::class, 'all']); // Admin view all patients

        // Departments: Admin full CRUD
        Route::post('/departments', [DepartmentController::class, 'store']);
        Route::put('/departments/{department}', [DepartmentController::class, 'update']);
        Route::delete('/departments/{department}', [DepartmentController::class, 'destroy']);
    });

    // -------------------------
    // DEPARTMENTS (ADMIN & STAFF)
    // Staff read-only
    // -------------------------
    Route::middleware('role:admin,staff')->group(function () {
        Route::get('/departments', [DepartmentController::class, 'index']);
        Route::get('/departments/{department}', [DepartmentController::class, 'show']);
    });

    // -------------------------
    // MULTI-ROLE ROUTES (admin OR staff)
    // -------------------------
    Route::middleware('role:admin,staff')->group(function () {
        Route::get('/reports', function () {
            return response()->json(['message' => 'Reports accessible by admin or staff']);
        });
    });
});

// -------------------------
// OPTIONAL: Predefined Departments (example)
// -------------------------
Route::get('/departments/predefined', function () {
    return response()->json([
        ['id' => 'dep_admin', 'name' => 'Administration & Management'],
        ['id' => 'dep_front_office', 'name' => 'Front Office / Patient Services'],
        ['id' => 'dep_med_records', 'name' => 'Medical Records Department'],
        ['id' => 'dep_billing', 'name' => 'Billing & Finance Department'],
        ['id' => 'dep_insurance', 'name' => 'Insurance / Claims Office'],
        ['id' => 'dep_hr', 'name' => 'Human Resources (HR)'],
        ['id' => 'dep_procurement', 'name' => 'Procurement & Supply Chain'],
        ['id' => 'dep_it', 'name' => 'IT / Support'],
        ['id' => 'dep_security', 'name' => 'Security & Access Control'],
        ['id' => 'dep_clinical', 'name' => 'Clinical Departments (Doctors & Nurses)'],
        ['id' => 'dep_lab', 'name' => 'Laboratory'],
        ['id' => 'dep_pharmacy', 'name' => 'Pharmacy'],
    ]);
});
