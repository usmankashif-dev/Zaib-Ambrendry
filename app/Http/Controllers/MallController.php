<?php

namespace App\Http\Controllers;

use App\Models\Mall;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MallController extends Controller
{
    public function store(Request $request)
    {
        \Log::info('Request received in store method. All data:', $request->all());
        
        try {
            $validated = $request->validate([
                'partyName' => 'required|string|max:255',
                'gazana' => 'required|numeric',
                'thanAmount' => 'required|numeric',
                'partyArrivalTime' => 'required|date',
                'frontLength' => 'required|string',
                'backLength' => 'required|string',
                'dupattaLength' => 'required|string',
                'lot' => 'required|string',
                'colorAmount' => 'required|numeric',
            ]);
            
            \Log::info('Validation passed. Validated data:', $validated);

            $mall = Mall::create($validated);
            \Log::info('Mall saved successfully with ID: ' . $mall->id);
            
            return redirect()->route('dashboard')->with('success', 'Mall details saved successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed:', $e->errors());
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Failed to save mall data. Exception: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return back()->with('error', 'Failed to save mall details. Please try again.');
        }
    }

    /**
     * Remove the specified Mall from storage.
     */
    public function destroy(Mall $mall)
    {
        try {
            \Log::info('Attempting to delete mall:', ['id' => $mall->id]);
            $deleted = $mall->delete();
            \Log::info('Mall deleted successfully:', ['id' => $mall->id, 'result' => $deleted]);
            return response()->noContent();
        } catch (\Exception $e) {
            \Log::error('Failed to delete mall: ' . $e->getMessage());
            throw $e;
        }
    }

    public function edit(Mall $mall)
    {
        return Inertia::render('EditMallForm', [
            'mall' => $mall
        ]);
    }

    public function update(Request $request, Mall $mall)
    {
        $validated = $request->validate([
            'partyName' => 'required|string|max:255',
            'gazana' => 'required|numeric',
            'thanAmount' => 'required|numeric',
            'partyArrivalTime' => 'required|date',
            'frontLength' => 'required|string',
            'backLength' => 'required|string',
            'dupattaLength' => 'required|string',
            'lot' => 'required|string',
            'colorAmount' => 'required|numeric',
        ]);

        try {
            $mall->update($validated);
            return redirect()->route('dashboard')->with('success', 'Mall updated successfully');
        } catch (\Exception $e) {
            \Log::error('Failed to update mall: ' . $e->getMessage());
            return back()->with('error', 'Failed to update mall');
        }
    }
}
