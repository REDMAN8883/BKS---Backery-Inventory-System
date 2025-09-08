<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movimiento;

class MovimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Movimiento::create([
            'tipo' => 'entrada',
            'cantidad' => 50,
            'motivo' => 'Ingreso de harina al inventario',
            'id_Productos' => 1, // FK a un producto existente
            'id_Usuarios' => 1,
        ]);

        Movimiento::create([
            'tipo' => 'salida',
            'cantidad' => 10,
            'motivo' => 'Uso de harina en receta',
            'id_Productos' => 1,
            'id_Usuarios' => 1,
        ]);
    }
}
