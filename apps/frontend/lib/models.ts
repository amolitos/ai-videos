export interface AspectRatio {
  id: number;
  name: string;
  description: string;
}

export interface ImageModel {
  id: number;
  version: string;
  name: string;
  example: string;
}

export interface VoiceModel {
  id: number;
  version: string;
  name: string;
  example: string;
}

export interface Track {
  id: number;
  title: string;
  url: string;
}

export interface VideoTemplate {
  aspect_ratio: string;
  image: { model: string };
  voice: { model: string };
  audio: { track: string };
  captions: {
    font_name: string;
    font_size: number;
    font_color: string;
    position_y: number;
  };
}

export interface Creator {
  id: number;
  name: string;
  content_instructions: string;
  planning_instructions?: string;
  script_instructions?: string;
  visual_instructions?: string;
  template?: VideoTemplate;
  created_at: string;
}
