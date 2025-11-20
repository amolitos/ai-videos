<?php

namespace App\Jobs;

use App\Models\Scene;
use App\Services\ReplicateService;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class TranscribeVoiceJob implements ShouldQueue
{
    use Batchable, Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Scene $scene,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(ReplicateService $replicate): void
    {
        $chunks = $replicate->transcribeVoice($this->scene->voice->filepath);

        $this->scene->voice->update([
            'chunks' => $chunks,
        ]);
    }
}
