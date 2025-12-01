<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'amount',
        'status',
        'method',
        'details'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
