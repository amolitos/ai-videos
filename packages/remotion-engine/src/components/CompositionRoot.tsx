import { Video } from "./Video";
import { CompositionProps } from "../constants/models";
import { DEFAULT_TEMPLATE } from "../constants/templates";
import { CalculateMetadataFunction, Composition } from "remotion";
import { fetchAndPrepareVideo } from "../utils/fetchAndPrepareVideo";

export const CompositionRoot: React.FC = () => {
  const defaultVideoProps: CompositionProps = {
    url: "",
    id: "",
    token: "",
    scenes: [],
    template: DEFAULT_TEMPLATE,
  };

  const calculateVideoMetadata: CalculateMetadataFunction<
    CompositionProps
  > = async ({ props }) => {
    const data = await fetchAndPrepareVideo(props.url, props.id, props.token);

    return {
      durationInFrames: data.durationInFrames,
      width: data.width,
      height: data.height,
      fps: data.fps,
      props: {
        ...props,
        ...data.props,
      },
    };
  };

  return (
    <Composition
      id="MyComp"
      component={Video}
      defaultProps={defaultVideoProps}
      calculateMetadata={calculateVideoMetadata}
    />
  );
};
