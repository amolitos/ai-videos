import { WipeDirection } from "@remotion/transitions/wipe";
import { random } from "remotion";

export const getRandomWipeDirection = (seed: number): WipeDirection => {
  const directions: WipeDirection[] = [
    "from-left",
    "from-top-left",
    "from-top",
    "from-top-right",
    "from-right",
    "from-bottom-right",
    "from-bottom",
    "from-bottom-left",
  ];
  return directions[Math.floor(random(seed) * directions.length)];
};
