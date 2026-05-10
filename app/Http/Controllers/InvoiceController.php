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
        try {
            $data = $request->validate([
                'partyName' => 'nullable|string',
                'previousBalance' => 'nullable|numeric',
                'remarks' => 'nullable|string',
                'rows' => 'required|array|min:1',
                'rows.*.lot' => 'required|string',
                'rows.*.itemName' => 'required|string',
                'rows.*.designNumber' => 'required|string',
                'rows.*.shape' => 'required|string',
                'rows.*.quantity' => 'required|numeric',
                'rows.*.stitches' => 'required|numeric',
                'rows.*.headLength' => 'required|numeric',
                'rows.*.ratePerThousandStitch' => 'required|numeric',
                'rows.*.rateValue' => 'required|numeric',
                'rows.*.than' => 'nullable|numeric',
                'rows.*.rate' => 'nullable|numeric',
            ]);

            // Get the next invoice number
            $invoiceNo = time();
            $data['invoiceNo'] = $invoiceNo;
            $data['rate'] = $data['rate'] ?? 0;

            \Log::info('Invoice data received', ['data' => $data]);

            return Inertia::render('Invoice/Invoice', [
                'invoiceData' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Invoice creation failed', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to create invoice. ' . $e->getMessage()]);
        }
    }
}