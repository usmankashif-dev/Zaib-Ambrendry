<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'name' => 'required|string|max:255',
            'shade' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
        ]);

        Item::create($validated);

        return redirect()->route('items.history')
            ->with('success', 'Item added successfully');
    }

    public function index()
    {
        return Inertia::render('Items/ItemsHistory', [
            'items' => Item::latest()->get()
        ]);
    }
}