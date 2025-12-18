<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id', 'type', 'date', 'notes'
    ];

    // Medical record belongs to a patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
