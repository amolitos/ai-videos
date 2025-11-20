import { cn } from "@/lib/utils";
import { AspectRatio } from "@/lib/models";
import { useWizard } from "react-use-wizard";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export const AspectRatioStep = ({
  aspectRatios,
}: {
  aspectRatios: AspectRatio[];
}) => {
  const { previousStep, nextStep } = useWizard();

  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selectedAspectRatio = watch("aspect_ratio");

  const onStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("aspect_ratio");
    if (isValid) nextStep();
  };

  return (
    <form
      onSubmit={onStepSubmit}
      className="h-full w-full flex flex-col gap-4 animate-in fade-in duration-600"
    >
      <p className="text-sm text-muted-foreground">
        Elige la relación de aspecto para tu contenido.
      </p>
      <div className="grid grid-cols-2 gap-5 mt-4">
        {aspectRatios.map((aspRatio) => {
          const [w, h] = aspRatio.name.split(":").map(Number);
          const isPortrait = h > w;
          const isSquare = h === w;

          let dimensionClass = "";

          if (isPortrait) {
            dimensionClass = "h-28";
          } else if (isSquare) {
            dimensionClass = "w-24";
          } else {
            dimensionClass = "w-32";
          }
          const ratioValue = aspRatio.name.replace(":", "/");
          return (
            <label
              key={aspRatio.id}
              className={cn(
                "cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:bg-accent transition-all duration-200",
                selectedAspectRatio == aspRatio.name
                  ? "border-violet-500 border-solid"
                  : "border-muted-foreground/20"
              )}
            >
              <input
                type="radio"
                value={aspRatio.name}
                className="sr-only"
                {...register("aspect_ratio")}
              />
              <div className="h-32 w-full flex items-center justify-center">
                <div
                  className={cn(
                    "bg-muted-foreground shadow-sm rounded-sm",
                    dimensionClass
                  )}
                  style={{ aspectRatio: ratioValue }}
                />
              </div>
              <h6 className="font-medium text-center text-sm group-hover:text-primary transition-colors">
                {aspRatio.description}
              </h6>
            </label>
          );
        })}
      </div>
      {errors.aspect_ratio && (
        <p className="font-medium text-sm text-destructive text-center">
          {errors.aspect_ratio.message?.toString()}
        </p>
      )}
      <div className="flex items-center gap-3 mt-auto ml-auto pt-6">
        <Button type="button" variant="outline" onClick={previousStep}>
          Atrás
        </Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
};
