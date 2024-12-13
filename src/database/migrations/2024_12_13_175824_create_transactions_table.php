<?php

use App\Models\Voucher;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('staff_id');
            $table->decimal('total_amount', 20, 2);
            $table->decimal('discount_amount', 20, 2)->default(0);
            $table->integer('points_earned')->default(0);
            $table->unsignedBigInteger('voucher_id')->nullable();
            $table->enum('payment_method', ['cash', 'credit_card', 'debit_card', 'mobile_payment', 'qris']);
            $table->enum('status', ['completed', 'pending', 'cancelled'])->default('completed');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('voucher_id')->references('id')->on('vouchers')->nullOnDelete();
            $table->foreign('staff_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
