<?php

namespace App\Http\Controllers;

use App\Models\Receta;
use Illuminate\Http\Request;

class RecetaController extends Controller
{
    // Mostrar recetas
    public function index()
    {
        $recetas = Receta::all();
        return response()->json($recetas);
    }

    // Crear receta
    public function store(Request $request)
    {
        $request->validate([
            'imagen_Receta' => 'nullable|string|max:255',
            'nombre_Receta' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'dificultad' => 'nullable|string',
            'porciones' => 'nullable|string',
            'notas_Adicionales' => 'nullable|string',
            'ingredientes' => 'nullable|string',
            'pasos_Preparacion' => 'nullable|string',
            'tiempo_Preparacion' => 'nullable|date_format:H:i:s',
            'activo' => 'nullable|boolean',
            'id_Productos' => 'nullable|integer|exists:productos,id'
        ]);
        // Crear receta
        $recetas = Receta::create($request->all());

        return response()->json([
            'message' => 'Receta creada cone éxito',
            'data' => $recetas
        ]);
    }

    // Mostrar receta por su ID 
    public function show(string $id)
    {
        $recetas = Receta::find($id);

        if(!$recetas){
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }
        return response()->json($recetas);
    }

    // Actualiza la receta 
    public function update(Request $request, string $id)
    {
        $recetas = Receta::find($id);

        if(!$recetas){
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        $recetas->update($request->all());

        return response()->json([
            'message' => 'Receta actualizada con éxito',
            'data' => $recetas
        ]);
    }

    // Elimina la receta 
    public function destroy(string $id)
    {
        $recetas = Receta::find($id);

        if(!$recetas){
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }

        $recetas->activo = 0;
        $recetas->save();

        return response()->json(['message' => 'Receta eliminada correctamente']);
    }
}
