<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Video;
use App\Services\OpenAIService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class VisualGuideJob implements ShouldQueue
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
        $this->video->update(['status' => VideoStatus::VISUAL_GUIDE]);

        $openai = new OpenAIService;
        $visualGuide = $openai->askAssistant(<<<EOT
            # ROLE & OBJECTIVE

            You are an expert AI cue engineer specializing in image generation.

            Your mission is to translate the creative direction of a script into a powerful and reusable "Master Style Cue" that ensures absolute visual consistency.

            #TASK

            Based on the provided SCRIPT, generate a "Master Style Cue." This should be a comma-separated list of keywords and short phrases that define the main visual aesthetic of the entire video.

            The cue should include keywords for:
            * Main Style: (e.g., cinematic photography, photorealistic, minimalist illustration, 3D rendering).
            * Lighting and Atmosphere: (e.g., soft natural lighting, dramatic cinematic lighting, vibrant).
            * Color Palette: (e.g., black, gold, blue, tones).
            * Key Details and Quality: (e.g., hyperdetail, 8K, professional photography).

            # OUTPUT FORMAT

            * ONLY use a comma-separated keyword string.
            * DO NOT use full sentences or paragraphs.
            * DO NOT explain options.
            * Example output: "Cinematic photography, professional corporate environment, soft natural lighting, muted blue and gray color palette, hyper-detailed, 8k"

            -------------------------------
            [SCRIPT]
            {$this->video->script}
        EOT);

        $this->video->update(['visual_guide' => $visualGuide]);
    }
}
