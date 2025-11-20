<?php

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
        Schema::create('scene_voices', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('scene_id');
            $table->foreign('scene_id')->references('id')->on('scenes');
            $table->string('filepath');
            $table->decimal('duration', 8, 2);
            $table->json('chunks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scene_voices');
    }
};
