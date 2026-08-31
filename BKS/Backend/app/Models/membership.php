<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class membership extends Model
{
    protected $table = 'membership';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'duracion_dias',
        'beneficios',
        'estado',
    ];

    protected $casts = [
        'beneficios' => 'array',
        'estado' => 'boolean',
        'precio' => 'decimal:2',
    ];
}
