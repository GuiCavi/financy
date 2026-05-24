import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Toggle } from "@/components/ui/toggle";
import { newCategorySchema, type NewCategorySchema } from "@/forms/schemas/new-category-schema";
import { cn } from "@/lib/utils";
import { CategoryColorBackgrounds } from "@/utils/colors";
import { CategoryIconMap } from "@/utils/icons";

import type { CSSProperties, SubmitEvent } from "react";

type AddCategoryFormProps = {
  onSubmit: (value: NewCategorySchema) => Promise<void>;
  defaultValues?: Partial<NewCategorySchema>;
};

export function AddCategoryForm({ onSubmit, defaultValues }: AddCategoryFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      icon: defaultValues?.icon ?? "",
      color: defaultValues?.color ?? "",
    },
    validators: {
      onSubmit: newCategorySchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Ex. Alimentação"
                    autoComplete="off"
                  />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="description"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Descrição da categoria"
                    autoComplete="off"
                  />
                </InputGroup>
                <FieldDescription>Opcional</FieldDescription>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field name="icon">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ícone</FieldLabel>
                <div className="grid gap-2 auto-grid" style={{ "--auto-grid-type": "auto-fit", "--auto-grid-min": "2.625rem" } as CSSProperties}>
                  {Object.entries(CategoryIconMap).slice(0, -1).map(([key, Icon]) => (
                    <Toggle
                      key={key}
                      aria-label={`toggle ${key} icon`}
                      size="sm"
                      value={key}
                      pressed={field.state.value === key}
                      variant="outline"
                      className="aspect-square size-full cursor-pointer bg-transparent border-border aria-pressed:bg-financy-grayscale-100 aria-pressed:border-financy-green-base dark:aria-pressed:bg-transparent dark:aria-pressed:border-financy-green-base"
                      onPressedChange={() => {
                        field.handleChange(key);
                      }}
                      onBlur={field.handleBlur}
                    >
                      <Icon className="size-5 text-foreground group-aria-pressed/toggle:text-financy-grayscale-600 dark:group-aria-pressed/toggle:text-financy-green-base" />
                    </Toggle>
                  ))}
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="color">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Cor</FieldLabel>
                <div className="grid gap-2 auto-grid" style={{ "--auto-grid-type": "auto-fill", "--auto-grid-min": "40px" } as CSSProperties}>
                  {Object.entries(CategoryColorBackgrounds).map(([key, background]) => (
                    <Toggle
                      key={key}
                      aria-label={`toggle ${key} icon`}
                      value={key}
                      pressed={field.state.value === key}
                      variant="outline"
                      className="p-1 rounded-md cursor-pointer bg-transparent border-border aria-pressed:bg-financy-grayscale-100 aria-pressed:border-financy-green-base dark:aria-pressed:bg-transparent dark:aria-pressed:border-financy-green-base"
                      onPressedChange={() => {
                        field.handleChange(key);
                      }}
                      onBlur={field.handleBlur}
                    >
                      <div className={cn(background, "size-full rounded-xs")} />
                    </Toggle>
                  ))}
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Field className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-financy-brand-base text-white hover:bg-financy-brand-dark transition-colors">
              {isSubmitting ? (<Loader2 className="size-4 animate-spin" />) : "Salvar"}
            </Button>
          </Field>
        )}
      </form.Subscribe>
    </form>
  );
}
