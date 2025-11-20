import { cn } from "@/lib/utils";
import { VoiceModel } from "@/lib/models";
import { Pause, Play } from "lucide-react";
import { useWizard } from "react-use-wizard";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useRef, useState, useEffect } from "react";

export const VoiceModelStep = ({
  voiceModels,
}: {
  voiceModels: VoiceModel[];
}) => {
  const { previousStep, nextStep } = useWizard();

  const {
    register,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedVoiceModel = watch("voice_model");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent, model: VoiceModel) => {
    e.preventDefault();
    setValue("voice_model", model.version, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (!audioRef.current) return;

    if (playingId === model.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = model.example;
      audioRef.current.play();
      setPlayingId(model.id);
    }
  };

  const handleAudioEnded = () => {
    setPlayingId(null);
  };

  const onStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("voice_model");
    if (isValid) {
      audioRef.current?.pause();
      nextStep();
    }
  };

  return (
    <form
      onSubmit={onStepSubmit}
      className="h-full w-full flex flex-col gap-6 animate-in fade-in duration-600"
    >
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
      <p className="text-sm text-muted-foreground">Elige una Voz</p>
      <div className="flex-1 overflow-y-auto pr-2 max-h-[500px] space-y-3 custom-scrollbar">
        {voiceModels.map((model) => {
          const isSelected = selectedVoiceModel === model.version;
          const isPlaying = playingId === model.id;

          return (
            <label
              key={model.id}
              className={cn(
                "relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                isSelected
                  ? "border-violet-500 bg-violet-50/10"
                  : "border-muted-foreground/20 hover:bg-accent/40"
              )}
            >
              <input
                type="radio"
                value={model.version}
                className="sr-only"
                {...register("voice_model", {
                  required: "Debes seleccionar una voz.",
                })}
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => toggleAudio(e, model)}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors z-10",
                    isPlaying
                      ? "bg-violet-500 text-white"
                      : "bg-muted text-foreground hover:bg-violet-100 hover:text-violet-600"
                  )}
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" />
                  )}
                </button>
                <div className="flex flex-col">
                  <h6
                    className={cn(
                      "font-semibold",
                      isSelected && "text-violet-200"
                    )}
                  >
                    {model.name}
                  </h6>
                </div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                  isSelected
                    ? "border-violet-500 bg-violet-500"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </label>
          );
        })}
      </div>
      {errors.voice_model && (
        <p className="text-sm text-destructive font-medium text-center bg-destructive/10 p-2 rounded animate-pulse">
          {errors.voice_model.message?.toString()}
        </p>
      )}
      <div className="flex items-center gap-3 mt-auto ml-auto pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            audioRef.current?.pause();
            previousStep();
          }}
        >
          Atrás
        </Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
};
