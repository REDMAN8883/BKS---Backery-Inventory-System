<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-basic', function() {
    return response()->json(['mensaje' => 'Test básico funciona']);
});