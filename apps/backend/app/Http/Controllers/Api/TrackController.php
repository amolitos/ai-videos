<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Track;

class TrackController extends Controller
{
    public function index()
    {
        return Track::all();
    }
}
