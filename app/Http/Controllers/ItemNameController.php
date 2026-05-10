<?php

namespace App\Http\Controllers;

use App\Models\ItemName;
use Illuminate\Http\Request;

class ItemNameController extends Controller
{
    public function index()
    {
        return response()->json(ItemName::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:item_names,name',
        ]);
        $itemName = ItemName::create(['name' => $request->name]);
        return response()->json($itemName);
    }
}