"use client";

import * as z from "zod";
import { toast } from "sonner";
import { Wizard } from "react-use-wizard";
import { useRouter } from "next/navigation";
import { TrackStep } from "./steps/TrackStep";
import { GeneralStep } from "./steps/GeneralStep";
import { CaptionsStep } from "./steps/CaptionsStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ImageModelStep } from "./steps/ImageModelStep";
import { VoiceModelStep } from "./steps/VoiceModelStep";
import { AspectRatioStep } from "./steps/AspectRatioStep";
import {
  createCreatorAction,
  updateCreatorAction,
} from "@/app/actions/creator";
import { AspectRatio, ImageModel, Track, VoiceModel } from "@/lib/models";

interface WizardProps {
  aspectRatios: AspectRatio[];
  imageModels: ImageModel[];
  voiceModels: VoiceModel[];
  tracks: Track[];
  defaultValues?: Partial<FormValues>;
  creatorId?: string;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  content_instructions: z
    .string()
    .min(10, "Especifica correctamente qué tipo de contenido va a generar."),
  aspect_ratio: z.string().min(4, "Elige una opción."),
  image_model: z.string().min(1, "Elige una opción."),
  voice_model: z.string().min(1, "Elige una opción."),
  font_name: z.string().min(1, "Elige una fuente."),
  font_size: z.number().min(40).max(80),
  font_color: z.string().regex(/^#/, "Debe ser un color válido"),
  position_y: z.number().min(10).max(90),
  track: z.string().min(1, "Elige una opción."),
});

export type FormValues = z.infer<typeof formSchema>;

export const CreatorForm = ({
  aspectRatios,
  imageModels,
  voiceModels,
  tracks,
  defaultValues,
  creatorId,
}: WizardProps) => {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: defaultValues || {
      name: "",
      content_instructions: "",
      aspect_ratio: "",
      image_model: "",
      voice_model: "",
      font_name: "Roboto",
      font_color: "#FFFFFF",
      font_size: 60,
      position_y: 70,
      track: "",
    },
  });

  const handleCreateCreator = async (values: FormValues) => {
    const payload = {
      name: values.name,
      content_instructions: values.content_instructions,
      template: {
        aspect_ratio: values.aspect_ratio,
        image: { model: values.image_model },
        voice: { model: values.voice_model },
        audio: { track: values.track },
        captions: {
          font_name: values.font_name,
          font_size: values.font_size,
          font_color: values.font_color,
          position_y: values.position_y,
        },
      },
    };

    let result;

    if (creatorId) {
      result = await updateCreatorAction(creatorId, payload);
    } else {
      result = await createCreatorAction(payload);
    }

    if (result.success) {
      toast.success(
        creatorId ? "Creador actualizado" : "Creador diseñado con éxito"
      );
      router.push("/app/creators");
      router.refresh();
    } else {
      toast.error(result.message || "No se pudo crear el creador");
      if (result.errors) {
        console.error("Backend validation errors:", result.errors);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Wizard>
        <GeneralStep />
        <AspectRatioStep aspectRatios={aspectRatios} />
        <ImageModelStep imageModels={imageModels} />
        <VoiceModelStep voiceModels={voiceModels} />
        <CaptionsStep />
        <TrackStep tracks={tracks} onFinish={handleCreateCreator} />
      </Wizard>
    </FormProvider>
  );
};
