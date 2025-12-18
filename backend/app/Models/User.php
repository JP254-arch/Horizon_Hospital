<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department_id'
    ];

    protected $hidden = [
        'password',
    ];

    // Automatically hash password
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    // Belongs to a department
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    // Has one patient record (if role is PATIENT)
    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

    // Has many appointments as doctor
    public function appointmentsAsDoctor()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }
}
