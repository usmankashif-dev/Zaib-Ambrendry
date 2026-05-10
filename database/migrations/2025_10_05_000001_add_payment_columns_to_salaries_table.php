<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('salaries', function (Blueprint $table) {
            $table->decimal('payments_amount', 10, 2)->default(0)->after('deduction_amount');
            $table->decimal('advances_amount', 10, 2)->default(0)->after('payments_amount');
        });
    }

    public function down()
    {
        Schema::table('salaries', function (Blueprint $table) {
            $table->dropColumn(['payments_amount', 'advances_amount']);
        });
    }
};