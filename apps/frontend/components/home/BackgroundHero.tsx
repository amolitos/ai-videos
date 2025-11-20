"use client";

import { GridScan } from "../magicui/GridScan";

export const BackgroundHero = () => {
  return (
    <GridScan
      sensitivity={0.55}
      lineThickness={1}
      linesColor="#7126da"
      gridScale={0.1}
      scanColor="#bf00ff"
      scanDelay={1}
      scanOpacity={0.4}
      enablePost
      bloomIntensity={0.6}
      chromaticAberration={0.002}
      noiseIntensity={0.01}
      scanDirection="forward"
      className={undefined}
      style={undefined}
    />
  );
};
