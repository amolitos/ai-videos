<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use SabatinoMasala\Replicate\Replicate;

class ReplicateService
{
    protected $replicate;

    public function __construct()
    {
        $token = env('REPLICATE_API_KEY');
        $this->replicate = new Replicate($token);
    }

    public function generateImage($model, $prompt, $aspectRatio)
    {
        $output = $this->replicate->run($model, [
            'prompt' => $prompt,
            'aspect_ratio' => $aspectRatio,
            'prompt_optimizer' => false,
        ]);

        $response = Http::get(is_array($output) ? $output[0] : $output);

        return $response->body();
    }

    public function transcribeVoice($voicePath)
    {
        $voice = base64_encode(Storage::get($voicePath));

        $output = $this->replicate->run('vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c', [
            'audio' => "data:application/octet-stream;base64,$voice",
            'timestamp' => 'word',
        ]);

        $chunks = array_map(function ($ch) {
            return (object) [
                'word' => $ch['text'],
                'start' => $ch['timestamp'][0],
                'end' => $ch['timestamp'][1],
            ];
        }, $output['chunks']);

        return $chunks;
    }
}
