import { cn } from "@/lib/utils";
import { Track } from "@/lib/models";
import { FormValues } from "../CreatorForm";
import { useWizard } from "react-use-wizard";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Pause, Play, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export const TrackStep = ({
  tracks,
  onFinish,
}: {
  tracks: Track[];
  onFinish: (values: FormValues) => Promise<void>;
}) => {
  const { previousStep } = useWizard();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext<FormValues>();

  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedTrackUrl = watch("track");

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent, track: Track) => {
    e.preventDefault();

    setValue("track", track.url, { shouldValidate: true });

    if (!audioRef.current) return;

    if (playingId === track.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = track.url;
      audioRef.current.play();
      setPlayingId(track.id);
    }
  };

  const handleAudioEnded = () => {
    setPlayingId(null);
  };

  const onFinalSubmit = async (data: FormValues) => {
    setPlayingId(null);
    console.log("🔥🔥 PAYLOAD FINAL (URL) 🔥🔥");
    console.log(JSON.stringify(data, null, 2));

    return onFinish(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFinalSubmit)}
      className="h-full w-full flex flex-col gap-6 overflow-y-auto animate-in fade-in duration-600"
    >
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
      <p className="text-sm text-muted-foreground">Elige la música de fondo.</p>
      <div className="flex-1 pr-2 overflow-y-auto custom-scrollbar space-y-3">
        {tracks.map((track) => {
          const isSelected = selectedTrackUrl === track.url;
          const isPlaying = playingId === track.id;
          return (
            <label
              key={track.id}
              className={cn(
                "relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                isSelected
                  ? "border-violet-500 bg-violet-50/10"
                  : "border-muted-foreground/20 hover:bg-accent/40"
              )}
            >
              <input
                type="radio"
                value={track.url}
                className="sr-only"
                {...register("track", {
                  required: "Selecciona una canción de fondo.",
                })}
              />
              <div className="flex items-center gap-4 w-full">
                <button
                  type="button"
                  onClick={(e) => toggleAudio(e, track)}
                  className={cn(
                    "shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all shadow-sm z-10",
                    isPlaying
                      ? "bg-violet-500 text-white scale-105"
                      : "bg-muted text-muted-foreground hover:bg-violet-100 hover:text-violet-600"
                  )}
                >
                  {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                </button>
                <div className="flex flex-col flex-1 min-w-0">
                  <h6
                    className={cn(
                      "font-semibold truncate",
                      isSelected && "text-violet-200"
                    )}
                  >
                    {track.title}
                  </h6>
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ml-2",
                    isSelected
                      ? "border-violet-500 bg-violet-500 text-white"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
      {errors.track && (
        <p className="font-medium text-sm text-destructive text-center">
          {errors.track.message?.toString()}
        </p>
      )}
      <div className="flex items-center gap-3 mt-auto ml-auto pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => {
            audioRef.current?.pause();
            previousStep();
          }}
        >
          Atrás
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
};
