import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transactionSchema, type TransactionSchema } from "@/forms/schemas/transaction-schema";
import { cn } from "@/lib/utils";
import { TransactionValueType, TranscationValueLabel } from "@/types/transaction";
import { TransactionTypeBorderColor, TransactionTypeColorVariants } from "@/utils/colors";
import { TransactionTypeIconMap } from "@/utils/icons";

import type { SubmitEvent } from "react";

type TransactionFormProps = {
  onSubmit: (value: TransactionSchema) => Promise<void>;
  defaultValues?: Partial<TransactionSchema>;
  categories: { id: string; name: string }[];
};

export function TransactionForm({ onSubmit, defaultValues, categories }: TransactionFormProps) {
  const form = useForm({
    defaultValues: {
      description: defaultValues?.description ?? "",
      amount: defaultValues?.amount ?? 0,
      categoryId: defaultValues?.categoryId ?? "",
      date: defaultValues?.date ?? new Date().toISOString().split("T")[0],
      type: defaultValues?.type ?? "EXPENSE",
    },
    validators: {
      onSubmit: transactionSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value as TransactionSchema);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <form.Field
          name="type"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Tabs defaultValue={TranscationValueLabel.EXPENSE} className="w-full" onValueChange={(value) => field.handleChange(value)}>
                  <TabsList className="w-full h-15.5! p-2 bg-transparent border border-border">
                    <TabsTrigger value={TransactionValueType.EXPENSE} className={cn("flex gap-3", TransactionTypeBorderColor.EXPENSE)}>
                      <TransactionTypeIconMap.EXPENSE className={TransactionTypeColorVariants.EXPENSE} />
                      {TranscationValueLabel.EXPENSE}
                    </TabsTrigger>
                    <TabsTrigger value={TransactionValueType.INCOME} className={cn("flex gap-3", TransactionTypeBorderColor.INCOME)}>
                      <TransactionTypeIconMap.INCOME className={TransactionTypeColorVariants.INCOME} />
                      {TranscationValueLabel.INCOME}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
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
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Ex. Supermercado, Salário, etc."
                    autoComplete="off"
                  />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <FieldGroup className="flex flex-row gap-4">
          <form.Field
            name="date"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type="date"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="amount"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Valor (R$)</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type="number"
                      step="0.01"
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder="0,00"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <form.Field
          name="categoryId"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Categoria</FieldLabel>
                <Select
                  value={categories.find((cat) => cat.id === field.state.value)?.name ?? ""}
                  onValueChange={(val) => field.handleChange(val || "")}
                >
                  <SelectTrigger className="w-full flex h-10 items-center justify-between border border-border bg-transparent rounded-md px-3 text-sm" size="lg">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[200px] z-50" alignItemWithTrigger={false}>
                    {categories.length === 0 ? (
                      <div className="p-2 text-xs text-muted-foreground text-center">Nenhuma categoria encontrada</div>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground outline-none"
                        >
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Field className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin mr-2" />}
              Salvar
            </Button>
          </Field>
        )}
      </form.Subscribe>
    </form>
  );
}
