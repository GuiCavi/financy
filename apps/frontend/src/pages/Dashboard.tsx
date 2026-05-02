import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { type ComponentProps, type PropsWithChildren, useEffect } from "react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";
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
            <p>teste</p>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard>
            <p>teste</p>
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

function DashboardCard({ className, ...props }: PropsWithChildren<ComponentProps<"div">>) {
  return <div className={cn("rounded-xl border border-border bg-card p-6", className)} {...props} />;
}

function HighlightCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <DashboardCard>
      <Item className="gap-3 p-0">
        <ItemMedia>{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle className="text-financy-grayscale-500 uppercase font-medium">{title}</ItemTitle>
        </ItemContent>
      </Item>

      <p className="text-3xl font-bold text-foreground mt-4">{value}</p>
    </DashboardCard>
  );
}