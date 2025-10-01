<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class JwtMiddleware 
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        
        if(!$token){
            return response->json(['mensaje' => 'Token no proporcionado'], 404);
        }

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $request->attributes->add(['user' => $decoded]);
        } catch (ExpiredException $e){
            return response()->json(['mensaje' => 'Token expirado'], 401);
        } catch (\Exception $e){
            return response()->json(['mensaje' => 'Token invalido'], 401);
        }

        return $next($request);
    }
}