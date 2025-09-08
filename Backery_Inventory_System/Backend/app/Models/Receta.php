<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    use HasFactory;

    protected $table = 'recetas'; // Nombre de la tabla 

    protected $fillable =[
        'imagen_Receta',
        'nombre_Receta',
        'descripcion',
        'dificultad',
        'porciones',
        'notas_Adicionales', 
        'ingredientes',
        'pasos_Preparacion',
        'tiempo_Preparacion',
        'activo',
        'id_Productos',
    ];

    // Relacion: Una receta tiene muchos productos
    public function producto() {
        return $this->belongsTo(Producto::class, 'id_Productos');
    }
}
