<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\MachineDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    public function index()
    {
        $bills = Bill::with(['machine.design.mall', 'snapshot.design.mall'])->latest()->get()->map(function($bill) {
            $machineData = $bill->machine ?? $bill->snapshot;
            return [
                'id' => $bill->id,
                'than_amount' => $bill->than_amount,
                'return_time' => $bill->return_time,
                'bill_amount' => $bill->bill_amount,
                'created_at' => $bill->created_at,
                'machine' => $machineData ? [
                    'id' => $machineData->id,
                    'employee_name' => $machineData->employee_name,
                    'production_time' => $machineData->production_time,
                    'design' => $machineData->design ? [
                        'id' => $machineData->design->id,
                        'design_number' => $machineData->design->design_number,
                        'stitch_amount' => $machineData->design->stitch_amount,
                        'mall' => $machineData->design->mall ? [
                            'id' => $machineData->design->mall->id,
                            'partyName' => $machineData->design->mall->partyName,
                            'lot' => $machineData->design->mall->lot,
                        ] : null
                    ] : null
                ] : null
            ];
        });
        
        return Inertia::render('Bill/Index', [
            'bills' => $bills
        ]);
    }

    public function create(MachineDetail $machine)
    {
        return Inertia::render('Bill/Form', [
            'machine' => $machine->load('design.mall')
        ]);
    }

    public function store(Request $request, MachineDetail $machine)
    {
        \Log::info('Bill creation started', [
            'machine_id' => $machine->id,
            'than_remaining' => $machine->than_remaining,
            'request_data' => $request->all()
        ]);

        $validated = $request->validate([
            'than_amount' => [
                'required',
                'integer',
                'min:1',
                "max:{$machine->than_remaining}"
            ],
            'return_time' => 'required|date',
            'bill_amount' => 'required|numeric|min:0'
        ]);

        \Log::info('Validation passed', [
            'validated_data' => $validated,
            'machine_than_remaining' => $machine->than_remaining
        ]);

        try {
            \DB::beginTransaction();
            \Log::info('Transaction started');

            // Fresh query to get the latest machine data
            $machine = MachineDetail::lockForUpdate()->findOrFail($machine->id);
            $machineData = $machine->toArray();
            $designId = $machine->design_id;
            $mallId = $machine->design->mall_id;

            \Log::info('Machine data fetched with lock', [
                'machine_data' => $machineData,
                'design_id' => $designId,
                'mall_id' => $mallId
            ]);
            
            // Ensure strict integer comparison
            $currentThan = intval($machine->than_remaining);
            $requestedThan = intval($validated['than_amount']);
            
            \Log::info('Than amount comparison', [
                'current_than' => $currentThan,
                'requested_than' => $requestedThan,
                'types' => [
                    'current_than_type' => gettype($currentThan),
                    'requested_than_type' => gettype($requestedThan)
                ],
                'raw_values' => [
                    'machine_than_remaining' => $machine->than_remaining,
                    'validated_than_amount' => $validated['than_amount']
                ]
            ]);
            
            // Verify amounts match exactly when needed
            if ($currentThan === $requestedThan) {
                $shouldDelete = true;
                $newThanRemaining = 0;
                \Log::info('Exact match detected - machine will be deleted', [
                    'current_than' => $currentThan,
                    'requested_than' => $requestedThan
                ]);
            } else {
                $shouldDelete = false;
                $newThanRemaining = $currentThan - $requestedThan;
                \Log::info('Partial amount detected', [
                    'current_than' => $currentThan,
                    'requested_than' => $requestedThan,
                    'new_than_remaining' => $newThanRemaining
                ]);
                if ($newThanRemaining < 0) {
                    \Log::error('Invalid than amount', [
                        'current_than' => $currentThan,
                        'requested_than' => $requestedThan,
                        'new_than_remaining' => $newThanRemaining
                    ]);
                    throw new \Exception('Than amount cannot exceed remaining thans');
                }
            }

            // Create bill record first
            $bill = Bill::create([
                'machine_id' => $machine->id,
                'than_amount' => $requestedThan,
                'return_time' => $validated['return_time'],
                'bill_amount' => $validated['bill_amount']
            ]);

            // Create history record before any machine changes
            \App\Models\History::create([
                'action' => 'create_bill',
                'description' => "Bill created for {$requestedThan} thans" . ($shouldDelete ? " (Machine completed)" : ""),
                'user_name' => auth()->user()->name,
                'model_type' => 'Bill',
                'model_id' => $bill->id,
                'mall_id' => $mallId,
                'design_id' => $designId,
                'old_data' => $machineData,
                'new_data' => array_merge($validated, [
                    'than_remaining' => $newThanRemaining,
                    'machine_deleted' => $shouldDelete
                ])
            ]);

            // Create machine snapshot
            $snapshot = \App\Models\MachineSnapshot::create([
                'bill_id' => $bill->id,
                'employee_name' => $machine->employee_name,
                'production_time' => $machine->production_time,
                'design_id' => $machine->design_id
            ]);

            // Update bill with snapshot
            $bill->update(['snapshot_id' => $snapshot->id]);

            // Handle machine update/deletion
            try {
                if ($shouldDelete) {
                    \Log::info('Attempting to delete machine', ['machine_id' => $machine->id]);
                    $machine->delete();
                    \Log::info('Machine deleted successfully');
                } else {
                    \Log::info('Attempting to update machine than_remaining', [
                        'machine_id' => $machine->id,
                        'old_than_remaining' => $machine->than_remaining,
                        'new_than_remaining' => $newThanRemaining
                    ]);
                    $machine->than_remaining = $newThanRemaining;
                    $machine->save();
                    \Log::info('Machine updated successfully');
                }
            } catch (\Exception $e) {
                \Log::error('Failed to update/delete machine', [
                    'machine_id' => $machine->id,
                    'should_delete' => $shouldDelete,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw $e;
            }

            \DB::commit();
            \Log::info('Transaction committed successfully');

            $message = 'Bill created successfully';
            if ($shouldDelete) {
                $message .= ' and machine completed';
            }

            \Log::info('Bill creation completed successfully', [
                'bill_id' => $bill->id,
                'machine_id' => $machine->id,
                'was_deleted' => $shouldDelete,
                'message' => $message
            ]);

            return to_route('bill.index')->with('success', $message);

        } catch (\Exception $e) {
            \DB::rollback();
            \Log::error('Bill creation failed', [
                'machine_id' => $machine->id,
                'than_amount' => $validated['than_amount'] ?? null,
                'error_message' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'stack_trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
                'machine_data' => $machineData ?? null
            ]);
            return back()->withInput()->withErrors(['error' => 'Failed to create bill: ' . $e->getMessage()]);
        }
    }

    public function edit(Bill $bill)
    {
        return Inertia::render('Bill/Form', [
            'bill' => $bill->load('machine.design.mall'),
            'isEditing' => true
        ]);
    }

    public function update(Request $request, Bill $bill)
    {
        $validated = $request->validate([
            'return_time' => 'required|date',
            'bill_amount' => 'required|numeric|min:0'
        ]);

        try {
            \DB::beginTransaction();

            // Store old data for history
            $oldData = $bill->toArray();

            // Update bill
            $bill->update($validated);

            // Create history record
            \App\Models\History::create([
                'action' => 'update_bill',
                'description' => "Bill updated",
                'user_name' => auth()->user()->name,
                'model_type' => 'Bill',
                'model_id' => $bill->id,
                'mall_id' => $bill->machine?->design?->mall_id,
                'design_id' => $bill->machine?->design_id,
                'old_data' => $oldData,
                'new_data' => array_merge($oldData, $validated)
            ]);

            \DB::commit();
            return to_route('bill.index')->with('success', 'Bill updated successfully');

        } catch (\Exception $e) {
            \DB::rollback();
            logger()->error('Bill update failed: ' . $e->getMessage());
            return back()->withInput()->withErrors(['error' => 'Failed to update bill: ' . $e->getMessage()]);
        }
    }

    public function destroy(Bill $bill)
    {
        try {
            \DB::beginTransaction();

            // Store data for history before deletion
            $billData = $bill->toArray();
            $machineId = $bill->machine_id;
            $designId = $bill->machine?->design_id;
            $mallId = $bill->machine?->design?->mall_id;

            // If the bill's machine still exists, restore its than_remaining
            if ($bill->machine) {
                $bill->machine->increment('than_remaining', $bill->than_amount);
            }

            // Delete the bill
            $bill->delete();

            // Create history record
            \App\Models\History::create([
                'action' => 'delete_bill',
                'description' => "Bill deleted",
                'user_name' => auth()->user()->name,
                'model_type' => 'Bill',
                'model_id' => $bill->id,
                'mall_id' => $mallId,
                'design_id' => $designId,
                'old_data' => $billData,
                'new_data' => null
            ]);

            \DB::commit();
            return back()->with('success', 'Bill deleted successfully');

        } catch (\Exception $e) {
            \DB::rollback();
            logger()->error('Bill deletion failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete bill: ' . $e->getMessage()]);
        }
    }
}
