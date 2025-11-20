<?php

namespace Database\Seeders;

use App\Models\AspectRatio;
use Illuminate\Database\Seeder;

class AspectRatioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AspectRatio::create([
            'name' => '9:16',
            'description' => 'Video vertical (TikTok, Reels, Shorts).',
            'height' => 1280,
            'weight' => 720,
        ]);

        AspectRatio::create([
            'name' => '16:9',
            'description' => 'Video horizontal (YouTube).',
            'height' => 720,
            'weight' => 1280,
        ]);
    }
}
