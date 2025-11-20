<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Track extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'laravel_through_key',
    ];

    /**
     * Interact with the  attribute.
     */
    public function getUrlAttribute($value)
    {
        return asset(Storage::url($value));
    }
}
