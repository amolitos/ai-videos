import { CSSProperties } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  Sequence,
  interpolate,
  random,
} from "remotion";
import { useMemo } from "react";
import { loadDynamicFont } from "../utils/fonts";
import { getAccentColors, getStrokeColor } from "../utils/captions";
import { Scene, Template, CaptionsT, Word } from "../constants/models";

type CaptionsStyle = Template["captions"] & {
  resolvedFontFamily: string;
};

const getFontWeight = (weight: string): CSSProperties["fontWeight"] => {
  const lower = weight.toLowerCase();
  if (lower === "bold") return "bold";
  if (lower === "normal") return "normal";
  return weight as CSSProperties["fontWeight"];
};

const RenderWordGroup = ({
  group,
  from,
  captions,
}: {
  group: Word[];
  from: number;
  captions: CaptionsStyle;
}) => {
  const frame = useCurrentFrame();
  const absoluteFrame = frame + from;

  const groupOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const currentWord = group.find(
    (w) => absoluteFrame >= w.start && absoluteFrame < w.end
  );

  const containerStyle: CSSProperties = {
    position: "absolute",
    top: `${captions.position_y}%`,
    width: "100%",
    padding: "0 35px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    opacity: groupOpacity,
  };

  const wordStyle: CSSProperties = {
    fontFamily: captions.resolvedFontFamily,
    color: captions.font_color,
    fontSize: captions.font_size,
    fontWeight: getFontWeight(captions.font_weight),
    filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))",
    WebkitTextStroke: `6px ${getStrokeColor(captions.font_color)}`,
    paintOrder: "stroke fill",
    transformOrigin: "center",
    margin: "0 7px",
  };

  return (
    <div style={containerStyle}>
      {group.map((word) => {
        const isHighlighted = currentWord && currentWord.word === word.word;

        const highlightColor = useMemo(() => {
          const colors = getAccentColors(captions.font_color);

          return colors[Math.floor(random(word.word) * colors.length)];
        }, [word.word, captions.highlight_colors]);

        return (
          <h3
            key={word.word}
            style={{
              ...wordStyle,
              color: isHighlighted ? highlightColor : "#FFFFFF",
              transform: isHighlighted ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.1s",
              margin: "0 8px",
            }}
          >
            {word.word}
          </h3>
        );
      })}
    </div>
  );
};

export const Captions = async ({
  scenes,
  captions,
}: {
  scenes: Scene[];
  captions: CaptionsT;
}) => {
  const fontFamily = await loadDynamicFont(captions.font_name);
  const captionsConfig: CaptionsStyle = {
    ...captions,
    resolvedFontFamily: fontFamily,
  };

  return (
    <AbsoluteFill>
      {scenes.map((scene) =>
        scene.wordGroups.map((group, index) => (
          <Sequence
            key={`${scene.id}-${index}`}
            from={group.sequenceFrom}
            durationInFrames={group.sequenceDuration}
          >
            <RenderWordGroup
              group={group.words}
              from={group.sequenceFrom}
              captions={captionsConfig}
            />
          </Sequence>
        ))
      )}
    </AbsoluteFill>
  );
};
