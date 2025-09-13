<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $histories = History::with('mall')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('History/Index', [
            'histories' => $histories
        ]);
    }

    public function show(History $history)
    {
        $history->load('mall');
        
        return Inertia::render('History/Show', [
            'history' => $history
        ]);
    }
}
