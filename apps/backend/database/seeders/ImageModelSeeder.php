<?php

namespace Database\Seeders;

use App\Models\ImageModel;
use Illuminate\Database\Seeder;

class ImageModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ImageModel::create([
            'version' => 'minimax/image-01',
            'name' => 'Minimax',
            'example' => 'https://replicate.delivery/xezq/DIW1tQHSNXY2Lhlk22V8fQsEqx5sDfqilWuNbciQTmf1mtpoA/tmpf6p003az.jpeg',
        ]);

        ImageModel::create([
            'version' => 'black-forest-labs/flux-dev',
            'name' => 'Flux Dev',
            'example' => 'https://replicate.delivery/yhqm/LhahE53ikx7ROteqIZ7Bgzc9wIoS76oQU8WLPPeUiCL9BiemA/out-0.webp',
        ]);

        ImageModel::create([
            'version' => 'black-forest-labs/flux-1.1-pro-ultra',
            'name' => 'Flux 1.1 Pro Ultra',
            'example' => 'https://replicate.delivery/czjl/r9f00cZeo4inIECF8vfKO4p9Zif2faRqOtGxfqaIwaDRq3l7E/output.jpg',
        ]);
    }
}
