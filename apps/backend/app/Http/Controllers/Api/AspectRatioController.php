<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AspectRatio;

class AspectRatioController extends Controller
{
    public function index()
    {
        return AspectRatio::all();
    }
}
