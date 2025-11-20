import React from "react";
import { Scene } from "../constants/models";
import { TRANSITION_FRAMES } from "../constants";
import { wipe } from "@remotion/transitions/wipe";
import { getRandomWipeDirection } from "../utils/transitions";
import { Img, interpolate, random, useCurrentFrame } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";

export const Images = ({ scenes }: { scenes: Scene[] }) => {
  const frame = useCurrentFrame();

  return (
    <TransitionSeries>
      {scenes.map((scene, index) => {
        const shouldZoomIn = random(index) > 0.5;

        const scaleAmount = 1.1;
        const scaleRange = shouldZoomIn ? [1, scaleAmount] : [scaleAmount, 1];

        const scale = interpolate(
          frame,
          [scene.start, scene.start + scene.end],
          scaleRange,
          {
            extrapolateRight: "clamp",
          }
        );

        const shouldRotateLeft = random(index + 2) > 0.5;
        const rotationAmount = 1.2;
        const rotationRange = shouldRotateLeft
          ? [-rotationAmount, rotationAmount]
          : [rotationAmount, -rotationAmount];

        const rotation = interpolate(
          frame,
          [scene.start, scene.start + scene.end],
          rotationRange,
          {
            extrapolateRight: "clamp",
          }
        );

        const endFrame = index == 0 ? scene.end : scene.end + TRANSITION_FRAMES;

        return (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={endFrame}>
              <Img
                src={scene.image.url}
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                }}
              />
            </TransitionSeries.Sequence>
            {index < scenes.length - 1 && (
              <TransitionSeries.Transition
                timing={linearTiming({
                  durationInFrames: TRANSITION_FRAMES,
                })}
                presentation={wipe({
                  direction: getRandomWipeDirection(index),
                })}
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};
