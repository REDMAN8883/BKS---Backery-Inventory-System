<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use App\Models\Producto;
use Illuminate\Http\Request;

class MovimientoController extends Controller
{
    //Mostrar movimientos - index (mostrar todos lo movimientos)
    public function index()
    {
        $movimientos = Movimiento::with(['producto', 'usuario'])->get();
        return response()->json($movimientos);
    }

    // Crear movimientos - store (crear movimiento)
    public function store(Request $request) 
    {
        $request->validate([
            'tipo' => 'required|in:entrada,salida',
            'cantidad' => 'required|integer|min:1',
            'motivo' => 'nullable|string|max:100',
            'fecha' => 'nullable|date',
            'activo' => 'nullable|boolean',
            'id_Productos' => 'nullable|integer|exists:productos,id',
            'id_Usuarios' => 'nullable|integer|exists:usuarios,id',
        ]);
        // Crear los movimientos
        $movimientos = Movimiento::create($request->all());

        // Actualizar stock 
        $producto = Producto::find($request->id_Productos);
        if ($request->tipo === 'entrada') {
            $producto->increment('stock_Actual', $request->cantidad);
        } else {
            $producto->decrement('stock_Actual', $request->cantidad);
        }

        return response()->json([
            'message' => 'Movimiento registrado con éxito',
            'data' => $movimientos
        ], 201);

    }

    // Mostrar por id 
    public function show(string $id)
    {
        $movimiento = Movimiento::with(['producto', 'usuario'])->find($id);

        if (!$movimiento) {
            return response()->json(['message' => 'Movimiento no encontrado'], 404);
        }

        return response()->json($movimiento);
    }

    // Actualizar movimiento
    public function update(Request $request, string $id)
    {
        $movimientos = Movimiento::find($id);

        if (!$movimientos) {
            return response()->json(['message' => 'Movimiento no encontrado'], 404);
        }

        $request->validate([
            'motivo' => 'nullable|string|max:100',
        ]);

        $movimientos->update($request->only('motivo'));

        return response()->json([
            'message' => 'Movimiento actualizado',
            'data' => $movimientos
        ]);
    }

    // borra el movimiento
    public function destroy(string $id)
    {
        $movimientos = Movimiento::find($id);

        if (!$movimientos) {
            return response()->json(['message' => 'Movimiento no encontrado'], 404);
        }

        if ($movimientos->activo == 0) {
            return response()->json(['message' => 'Movimiento ya estaba anulado'], 400);
        }

        // Revertir stock
        $producto = Producto::find($movimientos->id_Productos);
        if ($movimientos->tipo === 'entrada') {
            $producto->decrement('stock_Actual', $movimientos->cantidad);
        } else {
            $producto->increment('stock_Actual', $movimientos->cantidad);
        }

        // Marcar como anulado
        $movimientos->activo = 0;
        $movimientos->save();

        return response()->json(['message' => 'Movimiento anulado correctamente']);
    }
}
