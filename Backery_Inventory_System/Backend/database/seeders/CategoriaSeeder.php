<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create([
            'nombre_Categoria' => 'Panadería',
            'descripcion' => 'Productos de panadería artesanal',
            'activo' => true,
        ]);

        Categoria::create([
            'nombre_Categoria' => 'Repostería',
            'descripcion' => 'Tortas, pasteles y postres',
            'activo' => true,
        ]);
    }
}
