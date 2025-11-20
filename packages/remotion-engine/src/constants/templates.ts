import { Template } from "./models";

export const DEFAULT_TEMPLATE: Template = {
  aspect_ratio: "9:16",
  audio: {
    track: "http://localhost:8000/storage/tracks/AfterAll-Geographer.mp3",
    volume: 0.1,
  },
  captions: {
    font_name: "Roboto",
    font_size: 60,
    font_color: "#FFFFFF",
    font_weight: "Bold",
    highlight_colors: ["#FFFF00", "#69cafa"],
    position_y: 70,
  },
  voice: {
    volume: 1,
  },
};
