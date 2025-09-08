<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Rol;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtenemos los roles creados
        $adminRol = Rol::where('nombreRol', 'Admin')->first();
        $clienteRol = Rol::where('nombreRol', 'Cliente')->first();

        // Usuario Admin
        Usuario::create([
            'nombres' => 'Administrador',
            'apellidos' => 'Principal',
            'tipo_Documento' => 'CC',
            'numero_Documento' => '1234567890',
            'numero_Celular' => '3001234567',
            'correo_Empresarial' => 'admin@bakery.com',
            'imagen_Usuario' => null,
            'activo' => 1,
            'id_Rol' => $adminRol->id,
        ]);

        // Usuario Cliente
        Usuario::create([
            'nombres' => 'Cliente',
            'apellidos' => 'Ejemplo',
            'tipo_Documento' => 'CC',
            'numero_Documento' => '9876543210',
            'numero_Celular' => '3007654321',
            'correo_Empresarial' => 'cliente@bakery.com',
            'imagen_Usuario' => null,
            'activo' => 1,
            'id_Rol' => $clienteRol->id,
        ]);
    }
}
