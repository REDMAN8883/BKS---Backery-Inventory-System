<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller 
{
    public function login(Request $request)
    {
        try {
            Log::info('=== INICIO LOGIN ===');
            Log::info('Request completo:', $request->all());
            Log::info('Content-Type:', [$request->header('Content-Type')]);
            Log::info('Raw input:', [$request->getContent()]);
            
            // Obtener datos del request de múltiples formas
            $correo_Empresarial = $request->input('correo_Empresarial') ?? $request->correo_Empresarial ?? null;
            $contrasena = $request->input('contrasena') ?? $request->contrasena ?? null;

            Log::info('Datos extraídos:', [
                'correo_Empresarial' => $correo_Empresarial,
                'contrasena' => $contrasena ? 'Presente' : 'Ausente'
            ]);

            // Validaciones básicas
            if (empty($correo_Empresarial) || empty($contrasena)) {
                Log::error('Datos faltantes:', [
                    'correo_vacio' => empty($correo_Empresarial),
                    'contrasena_vacia' => empty($contrasena)
                ]);
                return response()->json(['mensaje' => 'Correo y contraseña son requeridos'], 400);
            }

            // Buscar usuario
            Log::info('Buscando usuario en base de datos');
            
            $usuario = DB::table('usuarios')
                ->join('roles', 'usuarios.id_Rol', '=', 'roles.id')
                ->select('usuarios.*', 'roles.nombreRol as rol')
                ->where('usuarios.correo_Empresarial', $correo_Empresarial)
                ->first();

            Log::info('Resultado búsqueda:', ['encontrado' => $usuario ? 'Si' : 'No']);

            if (!$usuario) {
                return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
            }

            // Verificar contraseña
            Log::info('Verificando contraseña');
            
            if (!Hash::check($contrasena, $usuario->contrasena)) {
                return response()->json(['mensaje' => 'Contraseña incorrecta'], 401);
            }

            // Crear token JWT
            Log::info('Creando token JWT');
            
            $payload = [
                'id' => $usuario->id,
                'rol' => strtolower($usuario->rol),
                'nombre' => $usuario->nombres . ' ' . $usuario->apellidos,
                'exp' => now()->addHours(3)->timestamp,
            ];

            $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            Log::info('Login exitoso');

            return response()->json([
                'token' => $token,
                'usuario' => [
                    'id' => $usuario->id,
                    'nombres' => $usuario->nombres . ' ' . $usuario->apellidos,
                    'rol' => strtolower($usuario->rol),
                    'email' => $usuario->correo_Empresarial,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Error en login:', [
                'mensaje' => $e->getMessage(),
                'archivo' => $e->getFile(),
                'linea' => $e->getLine()
            ]);
            
            return response()->json([
                'mensaje' => 'Error interno del servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}