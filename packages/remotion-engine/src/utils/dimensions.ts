export const calcDimensions = (ratio: string, resolution: number) => {
  const height = resolution;
  const width = Math.round((height * 16) / 9);

  if (ratio == "9:16") {
    return {
      height: width,
      width: height,
    };
  } else {
    return {
      height,
      width,
    };
  }
};
