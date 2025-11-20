export const toFrames = (seg: number, fps?: number) => {
  const frames = seg * (fps ?? 30);
  return Math.round(frames);
};
