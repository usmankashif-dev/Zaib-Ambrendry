<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('histories', function (Blueprint $table) {
            $table->foreignId('design_id')->nullable()->constrained('design_details')->nullOnDelete();
            $table->json('data')->nullable();
            $table->string('description')->nullable()->change();
            $table->string('user_name')->nullable()->change();
            $table->string('model_type')->nullable()->change();
            $table->unsignedBigInteger('model_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('histories', function (Blueprint $table) {
            $table->dropForeign(['design_id']);
            $table->dropColumn(['design_id', 'data']);
            $table->string('description')->nullable(false)->change();
            $table->string('user_name')->nullable(false)->change();
            $table->string('model_type')->nullable(false)->change();
            $table->unsignedBigInteger('model_id')->nullable(false)->change();
        });
    }
};