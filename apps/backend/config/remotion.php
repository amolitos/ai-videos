<?php

return [
    'node_bin_path' => env('NODE_BIN_PATH', 'npx'),
    'cli_bin_path' => env('CLI_BIN_PATH', 'remotion'),
    'entry_path' => env('ENTRY_PATH', '../../packages/remotion-engine/app.ts'),
    'concurrency' => env('REMOTION_CONCURRENCY', 1),
];
