<?php

namespace Database\Seeders;

use App\Models\Resolution;
use Illuminate\Database\Seeder;

class ResolutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Resolution::create([
            'name' => 'HD',
            'base' => 720,
        ]);

        Resolution::create([
            'name' => 'Full HD',
            'base' => 1080,
        ]);

        Resolution::create([
            'name' => '2k',
            'base' => 1440,
        ]);

        Resolution::create([
            'name' => '4k',
            'base' => 2160,
        ]);
    }
}
