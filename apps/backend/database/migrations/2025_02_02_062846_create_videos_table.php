<?php

use App\Enums\VideoStatus;
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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->text('title', 100)->nullable();
            $table->text('planning')->nullable();
            $table->text('script')->nullable();
            $table->text('visual_style')->nullable();
            $table->jsonb('template');
            $table->string('status', 30)->default(VideoStatus::STARTING);
            $table->string('url', 100)->nullable();
            $table->foreignId('creator_id');
            $table->foreign('creator_id')->references('id')->on('creators');
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
