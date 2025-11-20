<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VideoRequest;
use App\Http\Resources\VideoResource;
use App\Jobs\RenderVideoJob;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        return VideoResource::collection(Video::all());
    }

    public function store(VideoRequest $request)
    {
        $video = Video::create($request->validated());

        return $video;
    }

    public function show(Video $video)
    {
        return (new VideoResource($video->load('scenes')))->resolve();
    }

    public function update(VideoRequest $request, Video $video)
    {
        $video->update($request->validated());

        return $video;
    }

    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json([
            'sucess' => true,
        ], 200);
    }

    public function render(Video $video)
    {
        $token = request()->bearerToken();

        RenderVideoJob::dispatch($video, $token);

        return response()->json(['status' => true]);
    }
}
