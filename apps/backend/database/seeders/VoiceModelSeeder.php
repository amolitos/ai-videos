<?php

namespace Database\Seeders;

use App\Models\VoiceModel;
use Illuminate\Database\Seeder;

class VoiceModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VoiceModel::create([
            'version' => 'dXtC3XhB9GtPusIpNtQx',
            'name' => 'James',
            'example' => 'https://storage.googleapis.com/eleven-public-prod/database/user/XWwWNeeRhJOfmltwxQgPxrxDmh02/voices/dXtC3XhB9GtPusIpNtQx/1edb5a1f-3169-4351-b850-22f30a915213.mp3',
        ]);

        VoiceModel::create([
            'version' => 'k8cFOyAg7B9qwBlDDNTC',
            'name' => 'Andrew',
            'example' => 'https://storage.googleapis.com/eleven-public-prod/database/user/XHcA0XyQCRSBaeaB58jZCvOVqYr1/voices/68RUZBDjLe2YBQvv8zFx/q8CM1QxmBrz2Ew63xiMd.mp3',
        ]);

        VoiceModel::create([
            'version' => 'pjcYQlDFKMbcOUp6F5GD',
            'name' => 'Samanta',
            'example' => 'https://storage.googleapis.com/eleven-public-prod/custom/voices/FVQMzxJGPUBtfz1Azdoy/gKVnL9faq7ZIq960uZMm.mp3',
        ]);
    }
}
