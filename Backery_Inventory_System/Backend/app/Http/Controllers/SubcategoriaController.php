<?php

namespace App\Http\Controllers;

use App\Models\Subcategoria;
use Illuminate\Http\Request;

class SubcategoriaController
{
    //Mostrar subcategorias
    public function index()
    {
        $subcategorias = Subcategoria::all();
        return response()->json($subcategorias);
    }

    // Crear subcategorias
    public function store(Request $request)
    {
        // validacion de campos
        $request->validates([
            'nombre_Subcategoria' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:100',
            'activo' => 'nullable|boolean'
        ]);
        // Crear subcategorias
        $subcategorias = Subcategoria::create($request->all());

        return response()->json([
            'message' => 'Subcategoria creada con éxito',
            'data' => $subcategorias
        ], 201);
    }

    // Mostrar categorias por id
    public function show(string $id)
    {
        $subcategorias = Subcategoria::find($id);

        if(!$subcategorias) {
            return response()->json(['message' => 'Subcategoria no encontrada'], 404);
        }
        return response()->json($subcategorias);
    }

    // Actualizacion de subcategorias
    public function update(Request $request, string $id)
    {
        $subcategorias = Subcategoria::find($id);

        if(!$subcategorias){
            return response()->json(['message' => 'Subcategoria no encontrada'], 404);
        }

        $subcategorias->update($request->all());

        return response()->json([
            'message' => 'Subcategoria actualizada correctamente',
            'data' => $subcategorias
        ]);
    }

    // Eliminar subcategoria
    public function destroy(string $id)
    {
        $subcategorias = Subcategoria::find($id);

        if(!$subcategorias){
            return response()->json(['message' => 'Subcategoria no encontrada'], 404);
        }

        $subcategorias->activo = 0;
        $subcategorias-save();

        return response()->json(['message' => 'Subcategoria eliminada correctamente']);
    }
}
