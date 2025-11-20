<?php

namespace App\Enums;

enum VideoStatus: string
{
    case STARTING = 'STARTING';
    case PLANNING = 'PLANNING';
    case SCREENWRITER = 'SCREENWRITER';
    case VISUAL_GUIDE = 'VISUAL_GUIDE';
    case SCENE_IMAGES = 'SCENE_IMAGES';
    case SCENE_VOICES = 'SCENE_VOICES';
    case CAPTIONS = 'CAPTIONS';
    case RENDERING = 'RENDERING';
    case FINISH = 'FINISH';
    case FAILED = 'FAILED';
}
