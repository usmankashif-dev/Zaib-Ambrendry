<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('machine_details', function (Blueprint $table) {
            $table->integer('than_remaining')->default(0)->after('production_time');
        });

        // Update existing records
        $machines = \App\Models\MachineDetail::all();
        foreach ($machines as $machine) {
            if ($machine->design && $machine->design->mall) {
                $machine->than_remaining = $machine->design->mall->thanAmount;
                $machine->save();
            }
        }
    }

    public function down()
    {
        Schema::table('machine_details', function (Blueprint $table) {
            $table->dropColumn('than_remaining');
        });
    }
};