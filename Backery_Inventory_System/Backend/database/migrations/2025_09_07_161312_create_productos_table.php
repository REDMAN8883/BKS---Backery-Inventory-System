<?php // Tabla de Productos

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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->stirng('imagen_Producto', 255)->nullable();
            $table->stirng('nombre_Producto', 100);
            $table->integer('precio')->nullable();
            $table->integer('stock_Actual')->nullable();
            $table->integer('stock_Minimo')->nullable();
            $table->enum('tipo',['terminado', 'materia_prima']);
            $table->enum('unidad',['KG','LB','Unidad'])->nullable();
            $table->text('descripcion')->nullable();
            $table->timestamp('fecha_Creacion')->useCurrent();
            $table->timestamp('ultima_Actualizacion')->useCurrent()->useCurrentOnUpdate();
            $table->boolean('activo')->default(true);
            $table->unsignedBigInteger('id_SubCategorias');

            // Llave foranea
            $table->foreign('id_SubCategorias')->references('id')->on('subcategorias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
