<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bills', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['machine_id']);
            
            // Make machine_id nullable and add new foreign key that allows null
            $table->foreignId('machine_id')->nullable()->change();
            $table->foreign('machine_id')
                  ->references('id')
                  ->on('machine_details')
                  ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('bills', function (Blueprint $table) {
            $table->dropForeign(['machine_id']);
            $table->foreignId('machine_id')->change();
            $table->foreign('machine_id')
                  ->references('id')
                  ->on('machine_details');
        });
    }
};