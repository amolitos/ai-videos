<?php

namespace App\Services;

use ArdaGnsrn\ElevenLabs\ElevenLabs;
use Owenoj\LaravelGetId3\GetId3;

class ElevenLabsService
{
    protected $elevenlabs;

    public function __construct()
    {
        $this->elevenlabs = new ElevenLabs;
    }

    public function textToSpeech($model, $text, $filepath)
    {
        $response = $this->elevenlabs->textToSpeech(
            $model,
            $text,
            'eleven_multilingual_v2'
        );

        $response->saveFile($filepath);
        $trackInfo = GetId3::fromDiskAndPath('public', $filepath);

        return round($trackInfo->getPlaytimeSeconds(), 2);
    }
}
