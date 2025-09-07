<?php // Tabla de Subcategorias

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
        Schema::create('subcategorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_Subcategoria', 100);
            $table->string('descripcion', 100)->nullable();
            $table->boolean('activo',)->default(true);
            $table->unsignedBigInteger('id_Categorias');

            //Llave foranea
            $table->foreign('id_Categorias')->references('id')->on('categorias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcategorias');
    }
};
