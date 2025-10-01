<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model 
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $fillable = [
        'nombres',
        'apellidos',
        'tipo_Documento',
        'numero_Documento',
        'numero_Celular',
        'contrasena',
        'correo_Empresarial',
        'imagen_Usuario',
        'activo',
        'id_Rol',
    ];
    public $timestamps = false;

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'id_Rol');
    }
    
    public function movimientos()
    {
        return $this->hasMany(Movimiento::class, 'id_Usuarios');
    }
}
