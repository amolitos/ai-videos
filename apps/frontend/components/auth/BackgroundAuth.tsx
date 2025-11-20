"use client";

import FloatingLines from "../magicui/FloatingLines";

export const BackgroundAuth = () => {
  return (
    <FloatingLines
      enabledWaves={["top", "middle", "bottom"]}
      lineCount={[3, 4, 5]}
      lineDistance={[8, 6, 4]}
      bendRadius={5.0}
      bendStrength={-0.5}
      interactive={true}
      parallax={true}
      linesGradient={undefined}
      topWavePosition={undefined}
      middleWavePosition={undefined}
    />
  );
};
