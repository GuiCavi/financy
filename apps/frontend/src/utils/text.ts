export function getInitials(name: string) {
  const split = name.split(" ");

  if (split.length === 1) {
    return name.slice(0, 2).toUpperCase();
  }

  return split
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function formatMoney(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    ...options,
  }).format(value);
}

export function formatCount(
  count: number,
  singular = "item",
  plural = "itens",
) {
  const rule = new Intl.PluralRules("pt-BR").select(count);
  return `${count} ${rule === "one" ? singular : plural}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}