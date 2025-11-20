<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ImageModel;

class ImageModelController extends Controller
{
    public function index()
    {
        return ImageModel::all();
    }
}
