import { toFrames } from "./frames";
import { calcDimensions } from "./dimensions";
import { Template } from "../constants/models";
import { parseAndGroupChunks } from "./captions";
import { fetchVideoById } from "../services/video";
import { DEFAULT_TEMPLATE } from "../constants/templates";

export const fetchAndPrepareVideo = async (
  apiUrl: string,
  videoId: string,
  token?: string
) => {
  const videoData = await fetchVideoById(apiUrl, videoId, token);
  const { height, width } = calcDimensions(
    videoData.template.aspect_ratio,
    720
  );

  const apiTemplate = videoData.template || {};
  const finalTemplate: Template = {
    ...DEFAULT_TEMPLATE,
    ...apiTemplate,
    audio: {
      ...DEFAULT_TEMPLATE.audio,
      ...(apiTemplate.audio || {}),
    },
    captions: {
      ...DEFAULT_TEMPLATE.captions,
      ...(apiTemplate.captions || {}),
    },
    voice: {
      ...DEFAULT_TEMPLATE.voice,
      ...(apiTemplate.voice || {}),
    },
  };

  let durationInFrames = 0;

  const scenes = videoData.scenes.map((scene: any) => {
    const start = durationInFrames;
    const end = toFrames(Number(scene.voice.duration));
    durationInFrames += end;

    const wordGroups = parseAndGroupChunks(scene.voice.chunks, start);

    return {
      ...scene,
      start,
      end,
      wordGroups,
    };
  });

  return {
    width,
    height,
    fps: 30,
    durationInFrames,
    props: {
      scenes,
      template: finalTemplate,
    },
  };
};
