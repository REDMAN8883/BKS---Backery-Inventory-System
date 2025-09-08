<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    // Listar usuarios
    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    // Crear usuario
    public function store(Request $request)
    {
        //Validamos todos los campos
        $request->validate([
            'nombres' => 'nullable|string|max:50',
            'apellidos' => 'nullable|string|max:50',
            'tipo_Documento' => 'nullable|string|max:20',
            'numero_Documento' => 'nullable|string|max:100',
            'numero_Celular' => 'nullable|string|max:100',
            'correo_Empresarial' => 'nullable|string|max:100',
            'imagen_Usuario' => 'nullable|string|max:255',
            'activo' => 'nullable|boolean',
            'id_Rol' => 'nullable|integer|exists:roles,id',
        ]);
        // Creamos al usuario nuevo
        $usuarios = Usuario::create($request->all());

        return response()->json([
            'message' => 'Usuario creado con éxito',
            'data' => $usuarios
        ], 201);
    }

    // Mostrar usuario
    public function show(string $id)
    {
        $usuarios = Usuario::find($id);

        if(!$usuarios){
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuarios);
    }

    // Actualizar usuario
    public function update(Request $request, string $id)
    {
        $usuarios = Usuario::find($id);

        if(!$usuarios){
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuarios->update($request->all());

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'data' => $usuarios
        ]);
    }

    // Eliminar usuario
    public function destroy(string $id)
    {
        $usuarios = Usuario::find($id);

        if(!$usuarios) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuarios->activo = 0;
        $usuarios->save();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}
