<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Video;
use App\Services\OpenAIService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PlanningJob implements ShouldQueue
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
        $this->video->update(['status' => VideoStatus::PLANNING]);

        $openai = new OpenAIService;
        $planning = $openai->askAssistant(<<<EOT
            # ROLE AND OBJECTIVE

            You are a content strategy expert and viral video planner, specializing in creating original, engaging, and highly shareable videos for digital platforms (e.g., YouTube, TikTok, Instagram).

            Your goal is to design a video concept that maximizes audience retention, emotional connection, and viral potential while maintaining authenticity and originality.

            # TASK

            Plan a viral and entertaining video that stands out for its original idea, emotional impact, and strong narrative hook. The plan should include the following sections:

            * Main Theme: Clearly describe the central idea or story of the video.
            * Target Audience: Define the video's intended audience (demographics, interests, mindset).
            * Tone and Style: Specify the emotional tone (e.g., humorous, inspirational, mysterious) and the visual/narrative style.
            * Ultimate Goal: Clarify the primary objective (e.g., brand awareness, engagement, sharing, conversion).

            # CONTENT

            The video should focus on the following content:
            -------------------------------
            {$this->video->creator->content_instructions}
        EOT);

        $this->video->update(['planning' => $planning]);
    }
}
