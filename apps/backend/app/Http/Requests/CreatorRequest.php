<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $this->merge(['user_id' => $this->user()->id]);

        return [
            'name' => 'required|string|max:100',
            'content_instructions' => 'required|string',
            'behavior_instructions' => 'nullable|string',
            'planning_instructions' => 'nullable|string',
            'script_instructions' => 'nullable|string',
            'visual_instructions' => 'nullable|string',
            'template.aspect_ratio' => 'required|string',
            'template.audio.track' => 'required|string',
            'template.captions.font_name' => 'required|string',
            'template.captions.font_size' => 'required|numeric',
            'template.captions.font_color' => 'required|string',
            'template.captions.position_y' => 'required|numeric',
            'template.image.model' => 'required|string',
            'template.voice.model' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
