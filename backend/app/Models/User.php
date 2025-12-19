<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Automatically hash passwords
     */
    public function setPasswordAttribute($value): void
    {
        if ($value) {
            $this->attributes['password'] = Hash::make($value);
        }
    }

    /**
     * User belongs to a department (staff/admin)
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * User has one patient profile (patients only)
     */
    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

    /**
     * Appointments where user is the doctor
     */
    public function appointmentsAsDoctor()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }

    /**
     * Role helpers (optional but recommended)
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }

    public function isPatient(): bool
    {
        return $this->role === 'patient';
    }
}
