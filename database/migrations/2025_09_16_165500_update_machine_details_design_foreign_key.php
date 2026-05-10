<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('machine_details', function (Blueprint $table) {
            $table->dropForeign(['design_id']);
            $table->foreign('design_id')
                  ->references('id')
                  ->on('design_details')
                  ->onDelete('restrict'); // This will prevent deletion of designs that are referenced by machines
        });
    }

    public function down()
    {
        Schema::table('machine_details', function (Blueprint $table) {
            $table->dropForeign(['design_id']);
            $table->foreign('design_id')
                  ->references('id')
                  ->on('design_details')
                  ->onDelete('cascade');
        });
    }
};