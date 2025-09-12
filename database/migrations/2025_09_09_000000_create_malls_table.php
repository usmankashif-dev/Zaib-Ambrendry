<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('malls', function (Blueprint $table) {
            $table->id();
            $table->string('partyName');
            $table->integer('gazana');
            $table->integer('thanAmount');
            $table->dateTime('partyArrivalTime');
            $table->string('frontLength');
            $table->string('backLength');
            $table->string('dupattaLength');
            $table->string('lot');
            $table->integer('colorAmount');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('malls');
    }
};
