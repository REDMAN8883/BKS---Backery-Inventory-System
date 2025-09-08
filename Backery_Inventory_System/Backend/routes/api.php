<?php

use App\Http\Controllers\RolController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\SubcategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\MovimientoController;

// Ruta de Usuarios
Route::apiResource('usuarios', UsuarioController::class);

// Ruta de Categorias
Route::apiResource('categorias', CategoriaController::class);

// Ruta de subcategorias
Route::apiResource('subcategorias', SubcategoriaController::class);

// Ruta de Productos
Route::apiResource('productos', ProductosController::class);

// Ruta de Recetas
Route::apiResource('recetas', RecetaController::class);

// Ruta de Movimientos
Route::apiResource('movimientos', MovimientoController::class);


