<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function create()
    {
        return Inertia::render('Invoice/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'lot' => 'required|string',
            'itemName' => 'required|string',
            'designNumber' => 'required|string',
            'shape' => 'required|string',
            'quantity' => 'required|numeric',
            'stitches' => 'required|numeric',
            'headLength' => 'required|numeric',
            'ratePerThousandStitch' => 'required|numeric',
            'rateValue' => 'required|numeric',
        ]);

        return Inertia::render('Invoice/Invoice', [
            'invoiceData' => $data
        ]);
    }
}