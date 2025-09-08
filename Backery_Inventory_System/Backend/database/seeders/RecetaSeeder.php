<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Receta;

class RecetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Receta::create([
            'nombre_Receta' => 'Receta Pan Integral',
            'descripcion' => 'Pan integral básico',
            'dificultad' => 'Fácil',
            'porciones' => '10',
            'ingredientes' => 'Harina, Agua, Levadura',
            'pasos_Preparacion' => 'Mezclar, amasar, hornear',
            'tiempo_Preparacion' => '01:00:00',
            'activo' => true,
            'id_Productos' => 1
        ]);
    }
}
