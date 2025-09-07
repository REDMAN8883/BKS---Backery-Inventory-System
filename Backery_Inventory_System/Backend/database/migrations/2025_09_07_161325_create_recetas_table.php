<?php // Tabla de Recetas

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
        Schema::create('recetas', function (Blueprint $table) {
            $table->id();
            $table->string('imagen_Receta', 255)->nullable();
            $table->string('nombre_Receta', 100);
            $table->text('descripcion')->nullable();
            $table->text('dificultad')->nullable();
            $table->text('porciones')->nullable();
            $table->text('notas_Adicionales')->nullable();
            $table->text('ingredientes')->nullable();
            $table->time('tiempo_Preparacion')->nullable();
            $table->boolean('activo')->default(true);
            $table->unsignedBigInteger('id_Productos');

            // Llave foranea
            $table->foreign('id_Productos')->references('id')->on('productos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recetas');
    }
};
