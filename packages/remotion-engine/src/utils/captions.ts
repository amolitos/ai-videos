import { toFrames } from "./frames";

interface RawChunk {
  word: string;
  start: number;
  end: number;
}

export interface WordGroup {
  sequenceFrom: number;
  sequenceDuration: number;
  words: { word: string; start: number; end: number }[];
}

export const parseAndGroupChunks = (
  chunksJsonString: string,
  sceneStartFrame: number
): WordGroup[] => {
  try {
    const json = JSON.parse(chunksJsonString);
    const chunks: RawChunk[] = Object.values(json);

    const adjustedChunks = chunks.map((chunk) => ({
      word: chunk.word,
      start: toFrames(chunk.start) + sceneStartFrame,
      end: toFrames(chunk.end) + sceneStartFrame,
    }));

    const wordGroupsData = [];
    let currentIndex = 0;

    while (currentIndex < adjustedChunks.length) {
      const potentialGroup = adjustedChunks.slice(
        currentIndex,
        currentIndex + 3
      );
      let finalGroup = potentialGroup;

      if (
        potentialGroup.length > 1 &&
        potentialGroup[0].word.trim().endsWith(".")
      ) {
        finalGroup = potentialGroup.slice(0, 1);
      } else if (
        potentialGroup.length > 2 &&
        potentialGroup[1].word.trim().endsWith(".")
      ) {
        finalGroup = potentialGroup.slice(0, 2);
      }

      wordGroupsData.push(finalGroup);
      currentIndex += finalGroup.length;
    }

    return wordGroupsData
      .map((group) => {
        if (group.length === 0) return null;
        const firstWord = group[0];
        const lastWord = group[group.length - 1];
        return {
          sequenceFrom: firstWord.start,
          sequenceDuration: lastWord.end - firstWord.start,
          words: group,
        };
      })
      .filter((g): g is WordGroup => g !== null);
  } catch (e) {
    console.error("Error parsing voice chunks:", e);
    return [];
  }
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  if (hex.length !== 6) return null;

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  return { h, s, l };
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (val: number) =>
    Math.round((val + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getAccentColors = (primary: string) => {
  const rgb = hexToRgb(primary);
  if (!rgb) {
    return ["#FFFF00", "#69cafa"];
  }

  let { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const accentA = hslToHex(h, s * 100, Math.max(0, (l - 0.2) * 100));

  const accentB = hslToHex(
    h,
    Math.min(1, s * 1.3) * 100,
    Math.min(1, l * 1.25) * 100
  );

  return [accentA, accentB];
};

export const calcBrightness = (color: string): number => {
  let r = 128,
    g = 128,
    b = 128;

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const parts = color.match(/\d+/g);

    if (parts && parts.length >= 3) {
      r = Number(parts[0]);
      g = Number(parts[1]);
      b = Number(parts[2]);
    }
  }

  return 0.299 * r + 0.587 * g + 0.114 * b;
};

export const getStrokeColor = (textColor: string): string => {
  const brightness = calcBrightness(textColor);
  return brightness < 40 ? "#FFF" : "#000";
};
