<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('malls', function (Blueprint $table) {
            // Drop the enum constraint and recreate with new value
            \DB::statement("DROP INDEX IF EXISTS malls_status_index");
            \DB::statement("CREATE INDEX malls_status_index ON malls (status)");
        });
    }

    public function down()
    {
        Schema::table('malls', function (Blueprint $table) {
            \DB::statement("DROP INDEX IF EXISTS malls_status_index");
            \DB::statement("CREATE INDEX malls_status_index ON malls (status)");
        });
    }
};