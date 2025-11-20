import { Scene } from "../constants/models";
import { Html5Audio, Sequence } from "remotion";

export const Voices = ({ scenes }: { scenes: Scene[] }) => {
  return scenes.map((scene, index) => (
    <Sequence key={index} from={scene.start} durationInFrames={scene.end}>
      <Html5Audio src={scene.voice.url} />
    </Sequence>
  ));
};
