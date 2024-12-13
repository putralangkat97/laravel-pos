<?php

use App\Models\LoyaltyLevel;
use App\Models\User;
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
        Schema::create('user_loyalties', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('current_level_id')->nullable();
            $table->integer('total_points')->default(0);
            $table->datetime('last_point_updated')->nullable();
            $table->timestamps();

            $table->foreign('current_level_id')->references('id')->on('loyalty_levels')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_loyalties');
    }
};
