<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Mass assignable fields
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    // Hidden fields
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Doctor profile relationship
    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }
}
