import { useForm } from "@tanstack/react-form";
import { ArrowUpDown, Loader2, Plus, SquarePen, Tag, Trash } from "lucide-react";
import { type CSSProperties, type ReactNode, type SubmitEvent, Suspense, useMemo } from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardContent } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Toggle } from "@/components/ui/toggle";
import { CategoriesContainer } from "@/containers/CategoriesContainer";
import { newCategorySchema, type NewCategorySchema } from "@/forms/schemas/new-category-schema";
import { cn } from "@/lib/utils";
import type { DashboardListCategoriesOutput } from "@/types/category";
import { CategoryColorBackgrounds, CategoryColorVariants } from "@/utils/colors";
import { CategoryIconMap } from "@/utils/icons";
import { formatCount } from "@/utils/text";

type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

export default function Categories() {
  return (
    <div className="p-12 flex flex-col gap-6">
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        action={<AddCategoryDialog />}
      />

      <Suspense fallback={<div className="text-muted-foreground">Carregando categorias...</div>}>
        <CategoriesContainer>
          {(categories) => (
            <CategoriesContent categories={categories} />
          )}
        </CategoriesContainer>
      </Suspense>
    </div>
  );
}

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div>
        {action}
      </div>
    </div>
  );
}

function CategoriesContent({ categories }: { categories: Category[] }) {
  const summary = useMemo(() => {
    const totalCategories = categories.length;
    const totalTransactions = categories.reduce((acc, cat) => acc + (cat.transactionsCount || 0), 0);
    const mostUsedCategory = [...categories].sort((a, b) => (b.transactionsCount || 0) - (a.transactionsCount || 0))[0];

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    };
  }, [categories]);

  const Icon = summary.mostUsedCategory?.icon ? CategoryIconMap[summary.mostUsedCategory.icon] : CategoryIconMap.asterisk;
  const color = summary.mostUsedCategory?.color || "blue";

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="auto-grid gap-6" style={{ "--auto-grid-min": "300px", "--auto-grid-type": "auto-fit" } as CSSProperties}>
        <CategoriesHightlightCard
          icon={<Tag className="size-6 text-financy-grayscale-700" />}
          title={String(summary.totalCategories)}
          description="Total de categorias"
        />
        <CategoriesHightlightCard
          icon={<ArrowUpDown className="size-6 text-financy-purple-base" />}
          title={String(summary.totalTransactions)}
          description="Total de transações"
        />
        <CategoriesHightlightCard
          icon={<Icon className={cn("size-6", CategoryColorVariants[color], "bg-transparent")} />}
          title={summary.mostUsedCategory?.name || "Nenhuma"}
          description="Categoria mais utilizada"
        />
      </div>

      <div className="grid gap-2 items-stretch auto-grid ">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoriesHightlightCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <DashboardCard className="p-6 self-stretch">
      <Item className="gap-4">
        <ItemMedia variant="icon" className="mt-1">
          {icon}
        </ItemMedia>
        <ItemContent className="gap-2 w-full overflow-hidden">
          <ItemTitle className="text-3xl font-bold text-foreground truncate">{title}</ItemTitle>
          <ItemDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {description}
          </ItemDescription>
        </ItemContent>
      </Item>
    </DashboardCard>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = CategoryIconMap[category.icon as keyof typeof CategoryIconMap] || CategoryIconMap.asterisk;

  return (
    <DashboardCard className="group relative">
      <DashboardCardContent className="flex flex-col gap-8 h-full">
        <div className="flex flex-row justify-between">
          <div className={cn(
            "size-10 rounded-lg flex items-center justify-center",
            CategoryColorVariants[category.color as keyof typeof CategoryColorVariants] || CategoryColorVariants.blue,
          )}
          >
            <Icon className="size-4" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm">
              <Trash className="size-4 text-financy-feedback-danger" />
            </Button>
            <Button variant="outline" size="icon-sm">
              <SquarePen className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              Gerencie suas transações de
              {" "}
              {category.name.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <CategoryTag color={category.color}>{category.name}</CategoryTag>
          <span className="text-sm text-muted-foreground">
            {formatCount(category.transactionsCount || 0)}
          </span>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

function AddCategoryForm({ onSubmit }: { onSubmit: (value: NewCategorySchema) => void }) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      color: "",
    },
    validators: {
      onSubmit: newCategorySchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
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

      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Field className="mt-6">
            <Button type="submit">
              {isSubmitting ? (<Loader2 className="size-4 animate-spin" />) : "Salvar"}
            </Button>
          </Field>
        )}
      />
    </form>
  );
}

function AddCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 bg-financy-brand-base px-3 py-2">
            <Plus className="size-5" />
            Nova categoria
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">Nova categoria</DialogTitle>
          <DialogDescription className="text-sm">
            Adicione uma nova categoria para suas transações
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm onSubmit={(category) => console.log(category)} />
      </DialogContent>
    </Dialog>
  );
}