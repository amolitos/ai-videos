<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatorRequest;
use App\Http\Resources\CreatorResource;
use App\Jobs\CreateVideoJob;
use App\Models\Creator;
use App\Services\VideoService;

class CreatorController extends Controller
{
    public function index()
    {
        return CreatorResource::collection(Creator::all());
    }

    public function store(CreatorRequest $request)
    {
        $creator = Creator::create($request->all());

        return $creator;
    }

    public function show(Creator $creator)
    {
        return (new CreatorResource($creator))->resolve();
    }

    public function update(CreatorRequest $request, Creator $creator)
    {
        $creator->update($request->validated());

        return $creator;
    }

    public function destroy(Creator $creator)
    {
        $creator->delete();

        return response()->json([
            'sucess' => true,
        ], 200);
    }

    public function produce(Creator $creator, VideoService $videoService)
    {
        $video = $videoService->produce($creator);
        $token = request()->bearerToken();

        CreateVideoJob::dispatch($video, $token);

        return $video;
    }
}
