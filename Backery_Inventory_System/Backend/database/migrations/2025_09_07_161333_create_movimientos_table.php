<?php // Tabla de Movimientos

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
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', ['entrada', 'salida']);
            $table->integer('cantidad');
            $table->string('motivo');
            $table->timestamp('fecha')->useCurrent();
            $table->boolean('activo')->default(true);
            $table->unsignedBigInteger('id_Productos');
            $table->unsignedBigInteger('id_Usuairos');
            
            // Llaves foraneas
            $table->foreign('id_Productos')->references('id')->on('productos');
            $table->foreign('id_Usuarios')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimientos');
    }
};
