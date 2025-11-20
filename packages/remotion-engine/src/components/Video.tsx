import { Images } from "./Images";
import { Voices } from "./Voices";
import { Captions } from "./Captions";
import { AbsoluteFill } from "remotion";
import { CompositionProps } from "../constants/models";
import { BackgroundAudio } from "./BackgroundAudio";

export const Video = ({ scenes, template }: CompositionProps) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Images scenes={scenes} />
      <Voices scenes={scenes} />
      <Captions scenes={scenes} captions={template.captions} />
      <BackgroundAudio audio={template.audio} />
    </AbsoluteFill>
  );
};
