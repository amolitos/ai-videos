<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Video;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Bus;

class ScenesPendingVoiceJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Video $video) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->video->update(['status' => VideoStatus::SCENE_VOICES]);

        $pendingScenes = $this->video->scenes->load('voice')->filter(function ($scene) {
            return $scene->voice == null;
        });

        if ($pendingScenes->count() > 0) {
            $jobs = $pendingScenes->map(function ($scene) {
                return new SceneVoiceJob($this->video, $scene);
            });

            $this->prependToChain(Bus::batch($jobs));
        }
    }
}
