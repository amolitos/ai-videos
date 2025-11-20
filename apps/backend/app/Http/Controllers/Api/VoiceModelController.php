<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VoiceModel;

class VoiceModelController extends Controller
{
    public function index()
    {
        return VoiceModel::all();
    }
}
