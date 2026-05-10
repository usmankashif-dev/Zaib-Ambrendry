<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Create salaries table if it doesn't exist
        if (!Schema::hasTable('salaries')) {
            Schema::create('salaries', function (Blueprint $table) {
                $table->id();
                $table->foreignId('employee_id')->constrained()->onDelete('cascade');
                $table->decimal('base_amount', 10, 2);
                $table->decimal('bonus_amount', 10, 2)->default(0);
                $table->decimal('deduction_amount', 10, 2)->default(0);
                $table->decimal('payments_amount', 10, 2)->default(0);
                $table->decimal('advances_amount', 10, 2)->default(0);
                $table->decimal('net_amount', 10, 2);
                $table->string('month');
                $table->integer('year');
                $table->string('status')->default('pending');
                $table->date('payment_date')->nullable();
                $table->text('remarks')->nullable();
                $table->timestamps();
            });
        } else {
            // Add columns if they don't exist
            Schema::table('salaries', function (Blueprint $table) {
                if (!Schema::hasColumn('salaries', 'payments_amount')) {
                    $table->decimal('payments_amount', 10, 2)->default(0)->after('deduction_amount');
                }
                if (!Schema::hasColumn('salaries', 'advances_amount')) {
                    $table->decimal('advances_amount', 10, 2)->default(0)->after('payments_amount');
                }
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('salaries');
    }
};
