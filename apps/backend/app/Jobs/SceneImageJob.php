<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Scene;
use App\Models\SceneImage;
use App\Models\Video;
use App\Services\OpenAIService;
use App\Services\ReplicateService;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class SceneImageJob implements ShouldQueue
{
    use Batchable, Queueable;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 300;

    /**
     * The number of attempts the job can be made.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Video $video,
        public Scene $scene,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $visualGuide = $this->video->visual_guide;
        $scene = $this->scene->description;

        $openai = new OpenAIService;
        $description = $openai->askAssistant(<<<EOT
            # ROLE

            You are a concise visual translator. Your task is to describe the action of a scene with a simple, clear sentence for an AI image generator.

            # TASK

            Based on the scene text below, write a short, descriptive sentence that focuses ONLY on the main subject and their action.
            *Do NOT mention style, lighting, or colors.
            *Be direct and literal.

            Example: "A confident female CEO presenting in a modern boardroom."

            -------------------------------
            [SCENE TO BE DESCRIBE]
            $scene
        EOT);

        $prompt = $description.'. '.$visualGuide;

        $replicate = new ReplicateService;
        $image = $replicate->generateImage(
            $this->video->template['image']['model'],
            $prompt,
            $this->video->template['aspect_ratio']
        );

        $filepath = 'images/'.$this->scene->id.'.jpg';
        Storage::put($filepath, $image);

        SceneImage::updateOrCreate([
            'scene_id' => $this->scene->id,
        ], [
            'filepath' => $filepath,
            'prompt' => $prompt,
        ]);
    }

    /**
     * Handle a job failure.
     */
    public function failed(): void
    {
        $this->video->update(['status' => VideoStatus::FAILED]);
    }
}
