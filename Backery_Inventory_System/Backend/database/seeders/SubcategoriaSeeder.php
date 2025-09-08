<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subcategoria;

class SubcategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subcategoria::create([
            'nombre_Subcategoria' => 'Panes integrales',
            'descripcion' => 'Variedades de pan integral',
            'activo' => true,
            'id_Categorias' => 1, // FK a Panadería
        ]);

        Subcategoria::create([
            'nombre_Subcategoria' => 'Tortas frías',
            'descripcion' => 'Tortas sin horno',
            'activo' => true,
            'id_Categorias' => 2, // FK a Repostería
        ]);
    }
}
