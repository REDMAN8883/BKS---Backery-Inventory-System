<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\SubcategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\TestController;

Route::get('test', [TestController::class, 'index']);


// Ruta de Usuarios
Route::apiResource('usuarios', UsuarioController::class);

// Ruta de Categorias
Route::apiResource('categorias', CategoriaController::class);

// Ruta de subcategorias
Route::apiResource('subcategorias', SubcategoriaController::class);

// Ruta de Productos
Route::apiResource('productos', ProductoController::class);

// Ruta de Recetas
Route::apiResource('recetas', RecetaController::class);

// Ruta de Movimientos
Route::apiResource('movimientos', MovimientoController::class);


