<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SceneVoice extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'scene_voices';

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
