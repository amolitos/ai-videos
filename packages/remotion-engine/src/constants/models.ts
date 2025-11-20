export interface AudioT {
  track: string;
  volume: number;
}

export interface CaptionsT {
  font_name: string;
  font_size: number;
  font_color: string;
  font_weight: string;
  highlight_colors: string[];
  position_y: number;
}

export interface VoiceT {
  volume: number;
}

export interface Template {
  aspect_ratio: string;
  audio: AudioT;
  captions: CaptionsT;
  voice: VoiceT;
}

export interface CompositionProps extends Record<string, unknown> {
  url: string;
  id: string;
  token: string;
  scenes: any[];
  template: Template;
}

export interface SceneImage {
  id: number;
  url: string;
}

export interface SceneVoice {
  url: string;
  duration: string;
  chunks: string;
}

export interface Word {
  word: string;
  start: number;
  end: number;
}

export interface SceneWordGroup {
  sequenceFrom: number;
  sequenceDuration: number;
  words: Word[];
}

export interface Scene {
  id: number;
  description: string;
  image: SceneImage;
  voice: SceneVoice;
  start: number;
  end: number;
  wordGroups: SceneWordGroup[];
}
