<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Mostrar todos los productos 
     * Listar productos
     * GET /api/productos
     */
    public function index()
    {
        $productos = Producto::all(); // Hace la consulta a la BD "SELECT * FROM productos"
        return response()->json($productos);
    }

    /**
     * Crear productos nuevos
     * Crea el nuevo producto
     * POST /api/productos
     */
    public function store(Request $request)
    {
        //Validamos todos los campos 
        $request->validate([
            'imagen_Producto' => 'nullable|string|max:255',
            'nombre_Producto' => 'required|string|max:100',
            'precio' => 'nullable|numeric',
            'stock_Actual' => 'nullable|integer',
            'stock_Minimo' => 'nullable|integer',
            'tipo' => 'required|in:terminado,materia_prima',
            'unidad' => 'nullable|in:KG,LB,Unidad',
            'descripcion' => 'nullable|string',
            'fecha_Creacion' => 'nullable|date',
            'ultima_Actualizacion' => 'nullable|date',
            'activo' => 'nullable|boolean',
            'id_SubCategorias' => 'nullable|integer|exists:subcategorias,id',
        ]);
        // Crear los productos
        $producto = Producto::create($request->all());

        return response()->json([
            'message' => 'Producto creado con éxito',
            'data' => $producto
        ], 201);
    }

    /**
     * Mostrar un producto por ID
     * Busca el producto por su ID 
     * GET /api/productos/{id}
     */
    public function show(string $id)
    {
        $producto = Producto::find($id);

        if(!$producto){
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        return response()->json($producto);
    }

    /**
     * Actualizar un producto por ID
     * Busca y actualiza el producto por su ID 
     * PUT /api/productos/{id}
     */
    public function update(Request $request, string $id)
    {
        $producto = Producto::find($id);

        if(!$producto){
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $producto->update($request->all());

        return response()->json([
            'message' => 'Producto actualizado correctamente',
            'data' => $producto
        ]);
    }

    /**
     * Eliminar producto 
     * Busca el prodcuto y lo elimina por su ID
     * DELETE /api/productos/{id}
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);

        if(!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Descativar / SofDelete
        $producto->activo = 0;
        $producto->save();
        
        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
