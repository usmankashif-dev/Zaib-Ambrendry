<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('malls', function (Blueprint $table) {
            $table->string('status')->default('pending'); // pending, in_design, completed
        });
    }

    public function down()
    {
        Schema::table('malls', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
