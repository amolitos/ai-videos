import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useWizard } from "react-use-wizard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useFormContext } from "react-hook-form";

export const GeneralStep = () => {
  const { nextStep } = useWizard();
  const { control, trigger } = useFormContext();

  const onStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger(["name", "content_instructions"]);
    if (isValid) nextStep();
  };

  return (
    <form
      onSubmit={onStepSubmit}
      className="flex-1 flex flex-col gap-4 animate-in fade-in duration-600"
    >
      <div className="flex-1 min-h-0">
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ponle un nombre a tu creador"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="content_instructions"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Instrucciones</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id={field.name}
                    rows={10}
                    aria-invalid={fieldState.invalid}
                    placeholder="¿Que tipo de contenido deseas que tu creador genere?"
                    className="min-h-40 resize-none"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
};
