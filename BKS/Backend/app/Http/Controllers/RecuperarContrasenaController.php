<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

class RecuperarContrasenaController extends Controller
{
    public function RecuperarContrasena(Request $request)
    {
        $correo = $request->input('correo');
        $usuario = Usuario::where('correo_Empresarial', $correo)
            ->orWhere('correo_Personal', $correo)
            ->first();
        $codigo = random_int(100000, 999999);

        if ($usuario){
            DB::table('Contrasena_reset')->insert([
                'usuario_id' => $usuario->id,
                'codigo' => $codigo,
                'expiracion' => now()->addMinutes(10),
                'usado' => false,
                'creado' => now(),
                'proposito' => 'reset'
            ]);
        }

        return response()->json([
            'message' => 'Si el correo existe se enviara un codigo'
        ]);

        if(!$usuario){
            return response()->json([
                'message'=>'usuario no encontrado'
            ], 422);
        }
    }
}
