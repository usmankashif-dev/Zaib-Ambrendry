<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('design_details', function (Blueprint $table) {
            $table->string('status')->default('active')->after('stitch_amount'); // active, in_machine
        });
    }

    public function down()
    {
        Schema::table('design_details', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};