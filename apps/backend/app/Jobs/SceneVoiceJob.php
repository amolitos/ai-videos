<?php

namespace App\Jobs;

use App\Models\Scene;
use App\Models\SceneVoice;
use App\Models\Video;
use App\Services\ElevenLabsService;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SceneVoiceJob implements ShouldQueue
{
    use Batchable, Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Video $video,
        public Scene $scene,
        public ?string $model = null,
    ) {
        $this->model = $this->model ?? $video->template['voice']['model'];
    }

    /**
     * Execute the job.
     */
    public function handle(ElevenLabsService $elevenlabs): void
    {
        $filepath = 'voices/'.$this->scene->id.'.mp3';

        $duration = $elevenlabs->textToSpeech(
            $this->model,
            $this->scene->description,
            $filepath
        );

        SceneVoice::updateOrCreate([
            'scene_id' => $this->scene->id,
        ], [
            'filepath' => $filepath,
            'duration' => $duration,
        ]);
    }
}
