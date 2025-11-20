<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Scene;
use App\Models\Video;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Bus;

class ScenesPendingImageJob implements ShouldQueue
{
    use Queueable;

    public $timeout = 600;

    /**
     * Create a new job instance.
     */
    public function __construct(public Video $video) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->video->update(['status' => VideoStatus::SCENE_IMAGES]);
        $this->video->scenes()->delete();

        $scenes = array_filter(preg_split('/(\r\n|\r|\n)+/', $this->video->script));

        foreach ($scenes as $scene) {
            Scene::create([
                'description' => $scene,
                'video_id' => $this->video->id,
            ]);
        }

        $pendingScenes = $this->video->scenes->load('image')->filter(function ($scene) {
            return $scene->image == null;
        });

        if ($pendingScenes->count() > 0) {
            $jobs = $pendingScenes->map(function ($scene) {
                return new SceneImageJob($this->video, $scene);
            });

            $this->prependToChain(Bus::batch($jobs));
        }
    }
}
