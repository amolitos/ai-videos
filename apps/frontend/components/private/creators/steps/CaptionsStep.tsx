"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Check,
  ChevronsUpDown,
  Palette,
  Type,
  MoveVertical,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizard } from "react-use-wizard";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvailableFonts, getStrokeColor } from "@ai-videos/remotion-engine";

const PRESET_COLORS = [
  "#FFFFFF",
  "#FFFF00",
  "#000000",
  "#F43F5E",
  "#3B82F6",
  "#10B981",
];

const useGoogleFontLoader = (fontFamily: string | undefined) => {
  useEffect(() => {
    if (!fontFamily) return;
    const formattedName = fontFamily.replace(/\s+/g, "+");
    const linkId = `google-font-${formattedName}`;

    if (document.getElementById(linkId)) return;

    const link = document.createElement("link");
    link.id = linkId;
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@400;700;900&display=swap`;
    link.rel = "stylesheet";

    document.head.appendChild(link);
  }, [fontFamily]);
};

export const CaptionsStep = () => {
  const { previousStep, nextStep } = useWizard();
  const {
    setValue,
    watch,
    trigger,
    register,
    formState: { errors },
  } = useFormContext();

  const allFonts = useMemo(() => getAvailableFonts(), []);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedFontName = watch("font_name");
  const fontSize = watch("font_size") || 60;
  const fontColor = watch("font_color") || "#FFFFFF";
  const posY = watch("position_y") || 70;

  useGoogleFontLoader(selectedFontName);

  const filteredFonts = useMemo(() => {
    if (!searchQuery) return allFonts.slice(0, 50);
    return allFonts
      .filter((font) =>
        font.fontFamily.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 50);
  }, [allFonts, searchQuery]);

  const onStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await trigger(["font_name", "font_size", "font_color", "position_y"])) {
      nextStep();
    }
  };

  return (
    <form
      onSubmit={onStepSubmit}
      className="h-full w-full flex flex-col animate-in fade-in duration-600"
    >
      <p className="text-sm text-muted-foreground mb-6">
        Personaliza los subtítulos
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Label>Tipografía</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="justify-between w-full font-normal bg-card"
                >
                  {selectedFontName ? (
                    <span
                      style={{ fontFamily: selectedFontName }}
                      className="truncate"
                    >
                      {selectedFontName}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Buscar fuente...
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Buscar fuente..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList className="max-h-[300px]">
                    {filteredFonts.length === 0 && (
                      <CommandEmpty>No encontrada.</CommandEmpty>
                    )}
                    <CommandGroup
                      heading={searchQuery ? "Resultados" : "Populares"}
                    >
                      {filteredFonts.map((font) => (
                        <CommandItem
                          key={font.fontFamily}
                          value={font.fontFamily}
                          onSelect={() => {
                            setValue("font_name", font.fontFamily, {
                              shouldValidate: true,
                            });
                            setOpenCombobox(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedFontName === font.fontFamily
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {font.fontFamily}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              {...register("font_name", { required: "Elige una fuente" })}
            />
            {errors.font_name && (
              <p className="text-xs text-destructive">
                {errors.font_name.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Type size={16} /> Tamaño
                </Label>
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {fontSize}px
                </span>
              </div>
              <Slider
                defaultValue={[60]}
                value={[fontSize]}
                min={40}
                max={80}
                step={1}
                onValueChange={(vals) => setValue("font_size", vals[0])}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <MoveVertical size={16} /> Posición
                </Label>
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {posY}%
                </span>
              </div>
              <Slider
                defaultValue={[70]}
                value={[posY]}
                min={10}
                max={90}
                step={1}
                onValueChange={(vals) => setValue("position_y", vals[0])}
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Palette size={16} /> Color
            </Label>
            <div className="flex flex-wrap items-center gap-3 bg-muted p-3 rounded-lg border">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("font_color", color)}
                  className={cn(
                    "w-8 h-8 rounded-full transition-all hover:scale-110 outline-none border-0",
                    fontColor === color &&
                      "ring-2 ring-offset-1 ring-violet-500 scale-110"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="relative group ml-auto">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full border overflow-hidden cursor-pointer shadow-sm bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500",
                    !PRESET_COLORS.includes(fontColor) &&
                      "ring-2 ring-offset-2 ring-violet-500"
                  )}
                >
                  <input
                    type="color"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    {...register("font_color")}
                  />
                  <RefreshCcw
                    size={14}
                    className="absolute inset-0 m-auto text-white pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <div className="relative h-full w-full aspect-video rounded-xl border border-border shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-neutral-500">
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                  backgroundSize: "24px 24px",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
                }}
              />
            </div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200/80" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-slate-200/80" />
            <p
              className="absolute px-8 text-center leading-none select-none transition-all duration-150 ease-out w-full"
              style={{
                fontFamily: selectedFontName || "sans-serif",
                fontSize: `${fontSize}px`,
                fontWeight: 700,
                color: fontColor,
                top: `${posY}%`,
                transform: "translateY(-50%)",
                WebkitTextStroke: `6px ${getStrokeColor(fontColor)}`,
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))",
              }}
            >
              Subtítulos
            </p>
            <div className="absolute bottom-3 right-3 backdrop-blur text-white text-[10px] px-2 py-1 rounded font-mono border border-white">
              {Math.round(fontSize)}px | Y: {posY}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-auto ml-auto pt-4">
        <Button type="button" variant="outline" onClick={previousStep}>
          Atrás
        </Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
};
