<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->attributes->get('user');

        if(!$user){
            return response()->json(['mensaje' => 'Usuario no autenticado'], 402);
        }

        $userRole = strtolower($user->rol);

        $allowedRoles = array_map('strtolower', $roles);

        if (!in_array($userRole, $allowedRoles)) {
            return response()->json([
                'mensaje' => 'Acceso denegado: rol no autorizado'
            ], 403);
        }

        return $next($request);
    }
}