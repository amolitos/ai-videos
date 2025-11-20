<?php

namespace App\Jobs;

use App\Enums\VideoStatus;
use App\Models\Video;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

class RenderVideoJob implements ShouldQueue
{
    use Queueable;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 1000;
    /**
     * Create a new job instance.
     */
    public function __construct(
        public Video $video,
        public string $token,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->video->update(['status' => VideoStatus::RENDERING]);

        $file = 'videos/'.Str::ulid().'.mp4';
        $path = 'storage/app/public/'.$file;

        $nodeBin = Config::get('remotion.node_bin_path');
        $remotionBinary = Config::get('remotion.cli_bin_path');
        $remotionEntry = Config::get('remotion.entry_path');
        $remotionConcurrency = Config::get('remotion.concurrency');

        $command = [
            $nodeBin,
            $remotionBinary,
            'render',
            $remotionEntry,
            'MyComp',
            $path,
            '--concurrency='.$remotionConcurrency,
            '--props='.json_encode([
                'id' => $this->video->id,
                'url' => env('APP_URL'),
                'token' => $this->token,
            ]),
        ];

        $process = new Process($command, base_path());
        $process->setTimeout(600);
        $process->run();

        $console = new \Symfony\Component\Console\Output\ConsoleOutput;
        $console->writeln("\n".$process->getCommandLine()."\n");

        if ($process->isSuccessful()) {
            $this->video->update([
                'status' => VideoStatus::FINISH,
                'url' => $file,
            ]);
            $console->writeln("El video se generó correctamente en: $path\n");
        } else {
            $console->writeln('Mensaje de salida: '.$process->getErrorOutput()."\n");
            $this->video->update(['status' => VideoStatus::FAILED]);
        }
    }
}
