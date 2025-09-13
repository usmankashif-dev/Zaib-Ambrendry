<?php

namespace App\Http\Controllers;

use App\Models\Mall;
use App\Models\History;
use App\Models\DesignDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class DesignController extends Controller
{
    public function index()
    {
        $designs = DesignDetail::with(['mall' => function($query) {
            $query->where('status', Mall::STATUS_IN_DESIGN);
        }])->latest()->get();

        return Inertia::render('Design/Index', [
            'designs' => $designs->map(function($design) {
                return [
                    'id' => $design->id,
                    'design_number' => $design->design_number,
                    'stitch_amount' => $design->stitch_amount,
                    'created_at' => $design->created_at,
                    'mall' => [
                        'id' => $design->mall->id,
                        'partyName' => $design->mall->partyName,
                        'gazana' => $design->mall->gazana,
                        'thanAmount' => $design->mall->thanAmount,
                        'frontLength' => $design->mall->frontLength,
                        'backLength' => $design->mall->backLength,
                        'dupattaLength' => $design->mall->dupattaLength,
                        'lot' => $design->mall->lot,
                        'colorAmount' => $design->mall->colorAmount,
                        'partyArrivalTime' => $design->mall->partyArrivalTime,
                    ]
                ];
            })
        ]);
    }

    public function create(Mall $mall)
    {
        return Inertia::render('Design/Form', [
            'mall' => $mall
        ]);
    }

    public function store(Request $request, Mall $mall)
    {
        $validated = $request->validate([
            'design_number' => 'required|string',
            'stitch_amount' => 'required|numeric',
        ]);

        $design = new DesignDetail($validated);
        $design->mall_id = $mall->id;
        $design->save();

        // Update mall status
        $mall->status = Mall::STATUS_IN_DESIGN;
        $mall->save();

        // Record in history
        History::create([
            'action' => 'create_design',
            'description' => 'Design created with design number ' . $design->design_number,
            'user_name' => auth()->user()->name,
            'model_type' => 'design',
            'model_id' => $design->id,
            'mall_id' => $mall->id,
            'new_data' => $validated
        ]);

        return to_route('design.index')->with('success', 'Design details added successfully');
    }

    public function destroy(DesignDetail $design)
    {
        $mall = Mall::find($design->mall_id);
        $oldData = $design->only(['design_number', 'stitch_amount']);
        
        $design->delete();

        // If no more designs exist for this mall, update its status
        if ($mall && DesignDetail::where('mall_id', $mall->id)->count() === 0) {
            $mall->status = Mall::STATUS_PENDING;
            $mall->save();
        }

        // Record in history
        History::create([
            'action' => 'delete_design',
            'description' => 'Design deleted with design number ' . $oldData['design_number'],
            'user_name' => auth()->user()->name,
            'model_type' => 'design',
            'model_id' => $design->id,
            'mall_id' => $mall->id,
            'old_data' => $oldData
        ]);

        return back()->with('success', 'Design deleted successfully');
    }

    public function edit(DesignDetail $design)
    {
        $design->load('mall');
        return Inertia::render('Design/Form', [
            'design' => [
                'id' => $design->id,
                'design_number' => $design->design_number,
                'stitch_amount' => $design->stitch_amount,
                'mall' => [
                    'id' => $design->mall->id,
                    'partyName' => $design->mall->partyName,
                    'gazana' => $design->mall->gazana,
                    'thanAmount' => $design->mall->thanAmount,
                    'frontLength' => $design->mall->frontLength,
                    'backLength' => $design->mall->backLength,
                    'dupattaLength' => $design->mall->dupattaLength,
                    'lot' => $design->mall->lot,
                    'colorAmount' => $design->mall->colorAmount,
                    'partyArrivalTime' => $design->mall->partyArrivalTime,
                ]
            ]
        ]);
    }

    public function update(Request $request, DesignDetail $design)
    {
        $validated = $request->validate([
            'design_number' => 'required|string',
            'stitch_amount' => 'required|numeric',
        ]);

        $oldData = $design->only(['design_number', 'stitch_amount']);
        
        $design->update($validated);

        // Record in history
        History::create([
            'action' => 'edit_design',
            'description' => 'Design updated with design number ' . $design->design_number,
            'user_name' => auth()->user()->name,
            'model_type' => 'design',
            'model_id' => $design->id,
            'mall_id' => $design->mall_id,
            'old_data' => $oldData,
            'new_data' => $validated
        ]);

        return to_route('design.index')->with('success', 'Design updated successfully');
    }

    public function return(DesignDetail $design)
    {
        $mall = Mall::find($design->mall_id);
        
        if ($mall) {
            $oldData = $design->only(['design_number', 'stitch_amount']);
            
            // Update mall status back to pending
            $mall->status = Mall::STATUS_PENDING;
            $mall->save();

            // Delete the design as it's no longer in design state
            $design->delete();

            // Record in history
            History::create([
                'action' => 'return_design',
                'description' => 'Design returned to mall with design number ' . $oldData['design_number'],
                'user_name' => auth()->user()->name,
                'model_type' => 'design',
                'model_id' => $design->id,
                'mall_id' => $mall->id,
                'old_data' => $oldData,
                'new_data' => ['status' => Mall::STATUS_PENDING]
            ]);

            return back()->with('success', 'Design returned to mall successfully');
        }

        return back()->with('error', 'Could not find associated mall');
    }
}
