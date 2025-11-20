import { apiService } from "@/lib/api-service";
import { CreatorForm, FormValues } from "./CreatorForm";
import {
  AspectRatio,
  Creator,
  ImageModel,
  Track,
  VoiceModel,
} from "@/lib/models";

export const CreatorFormWrapper = async ({
  creatorId,
}: {
  creatorId?: string;
}) => {
  const [aspectRatios, imageModels, voiceModels, tracks, creatorToEdit] =
    await Promise.all([
      apiService.get<AspectRatio[]>("/aspect-ratios"),
      apiService.get<ImageModel[]>("/models/images"),
      apiService.get<VoiceModel[]>("/models/voices"),
      apiService.get<Track[]>("/tracks"),
      creatorId
        ? apiService.get<Creator>(`/creators/${creatorId}`)
        : Promise.resolve<Creator | null>(null),
    ]);

  let defaultValues: Partial<FormValues> | undefined = undefined;

  if (creatorToEdit && creatorToEdit.template) {
    defaultValues = {
      name: creatorToEdit.name,
      content_instructions: creatorToEdit.content_instructions,
      aspect_ratio: creatorToEdit.template.aspect_ratio,
      image_model: creatorToEdit.template.image.model,
      voice_model: creatorToEdit.template.voice.model,
      track: creatorToEdit.template.audio.track,
      font_name: creatorToEdit.template.captions.font_name,
      font_size: creatorToEdit.template.captions.font_size,
      font_color: creatorToEdit.template.captions.font_color,
      position_y: creatorToEdit.template.captions.position_y,
    };
  }

  return (
    <>
      <h3 className="font-bold text-2xl mb-8">Nuevo creador</h3>
      <CreatorForm
        aspectRatios={aspectRatios}
        imageModels={imageModels}
        voiceModels={voiceModels}
        tracks={tracks}
        defaultValues={defaultValues}
        creatorId={creatorId}
      />
    </>
  );
};
