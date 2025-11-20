<?php

namespace App\Jobs;

use App\Models\Video;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Bus;

class CreateVideoJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Video $video,
        public string $token
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Bus::chain([
            new PlanningJob($this->video),
            new ScreenwriterJob($this->video),
            new VisualGuideJob($this->video),
            new ScenesPendingImageJob($this->video),
            new ScenesPendingVoiceJob($this->video),
            new CaptionsJob($this->video),
            new RenderVideoJob($this->video, $this->token),
        ])->dispatch();
    }
}
