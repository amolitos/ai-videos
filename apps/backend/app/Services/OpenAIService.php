<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class OpenAIService
{
    protected $openai;

    public function __construct()
    {
        $this->openai = new OpenAI;
    }

    public function askAssistant($prompt, $model = 'gpt-4.1')
    {
        $result = $this->openai::chat()->create([
            'model' => $model,
            'messages' => [
                [
                    'role' => 'assistant',
                    'content' => $prompt,
                ],
            ],
        ]);

        return $result->choices[0]->message->content;
    }
}
