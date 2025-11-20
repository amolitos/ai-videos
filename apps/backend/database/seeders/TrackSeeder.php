<?php

namespace Database\Seeders;

use App\Models\Track;
use Illuminate\Database\Seeder;

class TrackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Track::create([
            'title' => 'Eternal Garden - Dan Henig',
            'url' => 'tracks/EternalGarden-DanHenig.mp3',
        ]);

        Track::create([
            'title' => 'Lights - Patrick Patrikios',
            'url' => 'tracks/Lights-PatrickPatrikios.mp3',
        ]);

        Track::create([
            'title' => 'Away - Patrick Patrikios',
            'url' => 'tracks/Away-PatrickPatrikios.mp3',
        ]);

        Track::create([
            'title' => 'After All - Geographer',
            'url' => 'tracks/AfterAll-Geographer.mp3',
        ]);

        Track::create([
            'title' => 'Know Myself - Patrick Patrikios',
            'url' => 'tracks/KnowMyself-PatrickPatrikios.mp3',
        ]);

        Track::create([
            'title' => 'Survive The Montage - RKVC',
            'url' => 'tracks/SurviveTheMontage-RKVC.mp3',
        ]);

        Track::create([
            'title' => 'Blue Dream - Cheel',
            'url' => 'tracks/BlueDream-Cheel.mp3',
        ]);

        Track::create([
            'title' => 'Exhale - JeremyBlake',
            'url' => 'tracks/Exhale-JeremyBlake.mp3',
        ]);

        Track::create([
            'title' => 'Keep Dreaming - TopherMohr',
            'url' => 'tracks/Keep Dreaming-TopherMohr.mp3',
        ]);

        Track::create([
            'title' => 'No Se - Casa Rosa',
            'url' => 'tracks/NoSe-CasaRosa.mp3',
        ]);
    }
}
