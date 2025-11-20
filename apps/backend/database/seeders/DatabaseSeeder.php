<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AspectRatioSeeder::class);
        $this->call(ResolutionSeeder::class);
        $this->call(ImageModelSeeder::class);
        $this->call(VoiceModelSeeder::class);
        $this->call(TrackSeeder::class);
    }
}
