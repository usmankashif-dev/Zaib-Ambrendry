<?php

namespace App\Http\Controllers;

use App\Models\DesignDetail;
use App\Models\MachineDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MachineController extends Controller
{
    public function index()
    {
        $machines = MachineDetail::with(['design.mall'])->latest()->get();
        
        // Convert dates to proper format for display
        $machines = $machines->map(function ($machine) {
            $machine->formatted_production_time = $machine->production_time ? $machine->production_time->format('Y-m-d H:i:s') : null;
            $machine->formatted_created_at = $machine->created_at->format('Y-m-d H:i:s');
            return $machine;
        });

        return Inertia::render('Machine/Index', [
            'machines' => $machines,
            'success' => session('success')
        ]);
    }

    public function create(DesignDetail $design)
    {
        return Inertia::render('Machine/Form', [
            'design' => $design->load('mall')
        ]);
    }

    public function store(Request $request, DesignDetail $design)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'production_time' => 'required|date'
        ]);

        try {
            \DB::beginTransaction();

            // First update mall status
            $mall = $design->mall;
            if ($mall) {
                $mall->status = \App\Models\Mall::STATUS_IN_MACHINE;
                $mall->save();
            }

            // Update design status and create machine record
            $designData = $design->toArray();
            
            // Update design status
            $design->status = \App\Models\DesignDetail::STATUS_IN_MACHINE;
            $design->save();

            // Create machine record
            $machine = new MachineDetail($validated);
            $machine->design_id = $design->id;
            $machine->than_remaining = $design->mall->thanAmount; // Set initial than_remaining
            $machine->save();

            // Create a history record
            \App\Models\History::create([
                'action' => 'moved_to_machine',
                'description' => "Design {$design->design_number} moved to machine",
                'user_name' => auth()->user()->name,
                'model_type' => 'Machine',
                'model_id' => $machine->id,
                'mall_id' => $design->mall_id,
                'design_id' => $design->id,
                'old_data' => $designData,
                'new_data' => array_merge($validated, ['status' => \App\Models\DesignDetail::STATUS_IN_MACHINE])
            ]);

            \DB::commit();

            return to_route('machine.index')
                ->with('success', 'Design successfully moved to machine.');

        } catch (\Exception $e) {
            \DB::rollback();
            logger()->error('Failed to move design to machine: ' . $e->getMessage());
            return back()->withInput()->withErrors(['error' => 'Failed to move design to machine: ' . $e->getMessage()]);
        }
    }

    public function edit(MachineDetail $machine)
    {
        return Inertia::render('Machine/Form', [
            'machine' => $machine->load('design.mall')
        ]);
    }

    public function update(Request $request, MachineDetail $machine)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'production_time' => 'required|date'
        ]);

        try {
            \DB::beginTransaction();

            // Store old data for history
            $oldData = $machine->toArray();

            // Update machine record
            $machine->update($validated);

            // Create history record
            \App\Models\History::create([
                'action' => 'update_machine',
                'description' => "Machine record updated for design {$machine->design->design_number}",
                'user_name' => auth()->user()->name,
                'model_type' => 'Machine',
                'model_id' => $machine->id,
                'mall_id' => $machine->design->mall_id,
                'design_id' => $machine->design_id,
                'old_data' => $oldData,
                'new_data' => $validated
            ]);

            \DB::commit();

            return to_route('machine.index')
                ->with('success', 'Machine record updated successfully.');

        } catch (\Exception $e) {
            \DB::rollback();
            logger()->error('Failed to update machine record: ' . $e->getMessage());
            return back()->withInput()->withErrors(['error' => 'Failed to update machine record: ' . $e->getMessage()]);
        }
    }

    public function destroy(MachineDetail $machine)
    {
        $machine->delete();

        return redirect()->route('machine.index')
            ->with('success', 'Machine record deleted successfully.');
    }
}
