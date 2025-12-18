<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'dob', 'age', 'gender', 'blood_type', 'height', 'weight', 'contact', 'address'
    ];

    // Patient belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Patient has many appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // Patient has many medical records
    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }
}
