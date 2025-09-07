<?php // Tabla de Usuarios

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 50)->nullable();
            $table->string('apellidos', 50)->nullable();
            $table->string('tipo_Documento', 20)->nullable();
            $table->string('numero_Documento', 100)->nullable();
            $table->string('numero_Celular', 100)->nullable();
            $table->string('correo_Empresarial', 100)->nullable();
            $table->string('imagen_Usuario', 100)->nullable();
            $table->boolean('activo',)->default(true);
            $table->unsignedBigInteger('id_Rol', 100);

            //Llave foranea
            $table->foreign('id_Rol')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
