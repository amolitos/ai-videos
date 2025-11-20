import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageModel } from "@/lib/models";
import { useWizard } from "react-use-wizard";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export const ImageModelStep = ({
  imageModels,
}: {
  imageModels: ImageModel[];
}) => {
  const { previousStep, nextStep } = useWizard();

  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selectedImageModel = watch("image_model");

  const onStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger("image_model");
    if (isValid) {
      nextStep();
    }
  };

  return (
    <form
      onSubmit={onStepSubmit}
      className="h-full w-full flex flex-col gap-4 animate-in fade-in duration-600"
    >
      <p className="text-sm text-muted-foreground">
        Selecciona un modelo de imagen.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {imageModels.map((model) => (
          <label
            key={model.id}
            className={cn(
              "cursor-pointer relative flex flex-col rounded-xl border-2 bg-card p-2 transition-all duration-200 hover:shadow-md",
              selectedImageModel == model.version
                ? "border-violet-500"
                : "border-muted-foreground/20"
            )}
          >
            <input
              type="radio"
              value={model.version}
              className="sr-only"
              {...register("image_model", {
                required: "Por favor selecciona un modelo antes de continuar.",
              })}
            />
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-muted/20">
              <Image
                src={model.example}
                alt={`Ejemplo de modelo ${model.version}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="mt-3 text-center">
              <h6 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {model.name}
              </h6>
            </div>
          </label>
        ))}
      </div>
      {errors.image_model && (
        <p className="font-medium text-sm text-destructive text-center">
          {errors.image_model.message?.toString()}
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
