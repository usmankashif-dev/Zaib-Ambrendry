<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('machine_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bill_id')->constrained('bills')->onDelete('cascade');
            $table->string('employee_name');
            $table->dateTime('production_time');
            $table->foreignId('design_id')->constrained('design_details');
            $table->timestamps();
        });

        // Add snapshot_id to bills table
        Schema::table('bills', function (Blueprint $table) {
            $table->foreignId('snapshot_id')->nullable()->after('machine_id')
                  ->constrained('machine_snapshots')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('bills', function (Blueprint $table) {
            $table->dropForeign(['snapshot_id']);
            $table->dropColumn('snapshot_id');
        });
        Schema::dropIfExists('machine_snapshots');
    }
};