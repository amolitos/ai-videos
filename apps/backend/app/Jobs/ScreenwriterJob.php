<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Video;
use App\Services\OpenAIService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ScreenwriterJob implements ShouldQueue
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
        $this->video->update(['status' => VideoStatus::SCREENWRITER]);

        $openai = new OpenAIService;
        $script = $openai->askAssistant(<<<EOT
            # ROLE AND OBJECTIVE

            You are an expert screenwriter for digital platforms, specializing in powerful narratives that capture attention from the first second and keep viewers emotionally engaged until the end.

            # TASK

            Your task is to write a solid narrative script for a video, structured by scenes and optimized for retention. Each paragraph should be concise, compelling, and short to keep the viewer's attention throughout each scene.

            # SCRIPT STRUCTURE

            The video should follow this approximate structure and pacing:

            * Hook: You can start with a provocative question, a powerful statement, or a shocking fact that immediately captures attention.
            * Introduction: Introduce the problem, conflict, or key question that sparks curiosity and introduces the concept or idea that will solve it.
            * Main Outline: Develop the theme through key ideas, examples, or emotional moments, maintaining narrative tension and pace.
            * Conclusion: Present a concise summary or emotional conclusion that reinforces the main message.
            * Call to Action: End with a clear and motivating action for the viewer (e.g., follow, share, comment, reflect, or take action).

            # OUTPUT FORMAT

            The script format STRICTLY follows the following rules:

            * One idea per paragraph: Describe each paragraph as if it were the text of an impactful slide.
            * VERY IMPORTANT: Do not include headings, subheadings, sections, scene numbers, timestamps, or notes.
            * VERY IMPORTANT: The script language must be ONLY in SPANISH.

            -------------------------------
            [PLANNING]
            {$this->video->planning}
        EOT);

        $this->video->update(['script' => $script]);
    }
}
