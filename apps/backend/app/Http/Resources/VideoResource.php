<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'status' => $this->status,
            'template' => $this->when($request->has('template'), $this->template),
            'scenes' => SceneResource::collection($this->whenLoaded('scenes')),
            'url' => $this->when($this->url, Storage::url($this->url)),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
