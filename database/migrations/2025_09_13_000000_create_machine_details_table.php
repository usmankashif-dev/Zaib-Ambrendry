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
            $table->foreignId('mall_id')->constrained()->onDelete('cascade');
            $table->string('design_number');
            $table->integer('stitch_amount');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('machine_details');
    }
};
