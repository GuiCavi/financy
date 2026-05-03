import { ChevronRight, CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { useEffect } from "react";

import { CategoryItem } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardContent, DashboardCardHeader } from "@/components/DashboardCard";
import { HighlightCard } from "@/components/HighlightCard";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/stores/category";

export function Dashboard() {
  const { listCategories } = useCategoryStore();

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  // const form = useForm({
  //   defaultValues: {
  //     name: "",
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       const { name } = values.value;
  //       const { data } = await apolloClient.mutate<CreateCategoryOutput, CreateCategoryInput>({
  //         mutation: CREATE_CATEGORY_MUTATION,
  //         variables: {
  //           data: {
  //             name,
  //           },
  //         },
  //       });

  //       if (data.createCategory) {
  //         toast.success("Categoria criada com sucesso");
  //       }
  //     } catch (error) {
  //       if (error instanceof CombinedGraphQLErrors) {
  //         toast.error(error.errors[0].message);
  //       } else {
  //         toast.error("Não foi possível criar a categoria");
  //       }
  //     }
  //   },
  // });

  return (
    <div className="p-12 grid grid-cols-1 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <HighlightCard icon={<Wallet className="size-5 text-financy-purple-base" />} title="Saldo total" value="R$ 12.847,32" />
        <HighlightCard icon={<CircleArrowUp className="size-5 text-financy-green-base" />} title="Receitas do mês" value="R$ 12.847,32" />
        <HighlightCard icon={<CircleArrowDown className="size-5 text-financy-red-base" />} title="Despesas do mês" value="R$ 12.847,32" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <DashboardCard>
            <DashboardCardContent>
              <p>teste</p>
            </DashboardCardContent>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard>
            <DashboardCardHeader
              action={
                <Button
                  variant="ghost"
                  size="xs"
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Gerenciar
                  <ChevronRight className="h-5 w-5" />
                </Button>
              }
            >
              Categorias
            </DashboardCardHeader>
            <DashboardCardContent className="gap-5">
              {[
                { label: "Alimentação", itemsCount: 12, value: "R$ 542,30", color: "blue" as const },
                { label: "Transporte", itemsCount: 8, value: "R$ 385,50", color: "purple" as const },
                { label: "Mercado", itemsCount: 3, value: "R$ 298,75", color: "orange" as const },
                { label: "Entretenimento", itemsCount: 2, value: "R$ 186,20", color: "pink" as const },
                { label: "Utilidades", itemsCount: 7, value: "R$ 245,80", color: "yellow" as const },
              ].map((cat, i) => (
                <CategoryItem
                  key={i}
                  label={cat.label}
                  itemsCount={cat.itemsCount}
                  value={cat.value}
                  color={cat.color}
                />
              ))}
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </div>

      {/* <pre>
        {JSON.stringify(categories, null, 2)}
      </pre>

      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    placeholder="Digite o nome da categoria"
                  />
                </InputGroup>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" variant="default" disabled={!canSubmit}>
              {isSubmitting ? "Adicionando..." : "Adicionar"}
            </Button>
          )}
        />
      </form> */}
    </div >
  );
}
