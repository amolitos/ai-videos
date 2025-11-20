import { Html5Audio } from "remotion";
import { AudioT } from "../constants/models";

export const BackgroundAudio = ({ audio }: { audio: AudioT }) => {
  return <Html5Audio loop src={audio.track} volume={audio.volume} />;
};
