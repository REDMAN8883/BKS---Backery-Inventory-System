<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController
{
    // Listar categorias
    public function index()
    {
        $categorias = Categoria::all();
        return response()->json($categorias);
    }

    // Crear categorias
    public function store(Request $request)
    {
        // Validacion de los campos
        $request->validates([
            'nombre_Producto' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:100',
            'activo' => 'nullable|boolean',
        ]);
        // Crear categorias 
        $categorias = Categoria::create($request->all());

        return response()->json([
            'message' => 'Categoria creada con éxito',
            'data' => $categorias
        ], 201);
    }

    // Mostrar categoria id
    public function show(string $id)
    {
        $categorias = Categoria::find($id);

        if(!$categorias){
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        return response()->json($categorias);
    }

    // Actualizacion de categorias
    public function update(Request $request, string $id)
    {
        $categorias = Categoria::find($id);

        if(!$categorias){
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        $categorias->update($request->all());

        return response()->json([
            'message' => 'Categoria actualizada correctamente',
            'data' => $categorias
        ]);
    }

    // Eliminar categorias
    public function destroy(string $id)
    {
        $categorias = Categoria::find($id);

        if(!$categorias){
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        $categorias->activo = 0;
        $categorias->save();

        return response()->json(['message' => 'Categoria eliminada correctamente']);
    }
}
