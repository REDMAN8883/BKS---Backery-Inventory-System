<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::create([
            'nombre_Producto' => 'Pan integral',
            'precio' => 2500,
            'stock_Actual' => 50,
            'stock_Minimo' => 10,
            'tipo' => 'terminado',
            'unidad' => 'Unidad',
            'descripcion' => 'Pan integral recién horneado',
            'activo' => true,
            'id_SubCategorias' => 1
        ]);
    }
}
