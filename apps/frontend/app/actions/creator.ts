"use server";

import { revalidatePath } from "next/cache";
import { VideoTemplate } from "@/lib/models";
import { apiService, ApiError } from "@/lib/api-service";

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]> | null;
};

interface CreateCreatorPayload {
  name: string;
  content_instructions: string;
  template: VideoTemplate;
}

export async function createCreatorAction(
  payload: CreateCreatorPayload
): Promise<ActionResponse> {
  try {
    await apiService.post("/creators", payload);

    revalidatePath("/app/creators");

    return { success: true };
  } catch (error: unknown) {
    console.error("Error creating creator:", error);

    if (error instanceof ApiError && error.status === 422) {
      return {
        success: false,
        message: "Error de validación en los datos.",
        errors: error.data as Record<string, string[]>,
      };
    }

    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado.";

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function updateCreatorAction(
  id: string,
  payload: CreateCreatorPayload
): Promise<ActionResponse> {
  console.log("====================================");
  console.log(payload);
  console.log("====================================");
  try {
    await apiService.put(`/creators/${id}`, payload);

    revalidatePath("/app/creators");
    revalidatePath(`/app/creators/${id}`);

    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating creator:", error);
    return { success: false, message: "Error al actualizar." };
  }
}
