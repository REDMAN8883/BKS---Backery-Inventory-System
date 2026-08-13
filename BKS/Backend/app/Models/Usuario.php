<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model 
{
    use HasFactory;

    protected $table = 'users';
    protected $fillable = [
        'nombres',
        'apellidos',
        'id_Document',
        'numero_Documento',
        'numero_Celular',
        'contrasena',
        'correo_Empresarial',
        'correo_Personal',
        'imagen_Usuario',
        'correo_Verificado',
        'prefijo',
        'acepta_terminos',
        'fecha_aceptacion_terminos',
        'confirma_mayoria_edad',
        'fecha_confirmacion_edad',
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
