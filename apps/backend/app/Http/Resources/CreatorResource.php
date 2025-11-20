<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreatorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isByID = $request->routeIs('creators.show');

        return [
            'id' => $this->id,
            'name' => $this->name,
            $this->mergeWhen($isByID, [
                'content_instructions' => $this->content_instructions,
                'planning_instructions' => $this->planning_instructions,
                'script_instructions' => $this->script_instructions,
                'visual_instructions' => $this->visual_instructions,
                'template' => $this->template,
            ]),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
