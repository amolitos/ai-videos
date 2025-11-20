<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SceneImage extends Model
{
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'scene_id',
        'created_at',
        'updated_at',
    ];
}
