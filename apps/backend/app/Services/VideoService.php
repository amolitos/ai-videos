<?php

namespace App\Services;

use App\Models\Creator;
use App\Models\Video;

class VideoService
{
    public function produce(Creator $creator): Video
    {
        $video = Video::Create([
            'template' => $creator->template,
            'creator_id' => $creator->id,
            'user_id' => $creator->user_id,
        ]);

        return $video;
    }
}
