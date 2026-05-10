<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('machine_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id')->constrained('design_details')->onDelete('cascade');
            $table->string('employee_name');
            $table->timestamp('production_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('machine_details');
    }
};
