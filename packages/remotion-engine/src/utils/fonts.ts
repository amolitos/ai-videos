import { loadFont } from "@remotion/google-fonts/Roboto";
import { getAvailableFonts } from "@remotion/google-fonts";

export { getAvailableFonts } from "@remotion/google-fonts";

export const loadDynamicFont = async (fontName: string) => {
  const availableFonts = getAvailableFonts();
  const selectedFont = availableFonts.find(
    (font) => font.fontFamily === fontName
  );

  if (selectedFont) {
    const loaded = await selectedFont.load();
    const { fontFamily } = loaded.loadFont();
    return fontFamily;
  }

  const { fontFamily } = loadFont();
  return fontFamily;
};
