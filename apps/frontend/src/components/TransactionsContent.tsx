import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { CategoryTag } from "@/components/CategoryItem";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DELETE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";
import type { DashboardListTransactionsOutput } from "@/types/transaction";
import { CategoryColorVariants, TransactionTypeColorVariants } from "@/utils/colors";
import { CategoryIconMap, TransactionTypeIconMap } from "@/utils/icons";
import { formatMoney } from "@/utils/text";

type Transaction = NonNullable<DashboardListTransactionsOutput["listTransactions"]>[number];
type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

interface TransactionsContentProps {
  transactions: Transaction[];
  categories: Category[];
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const categoryIconVariants = cva("flex size-10 shrink-0 items-center justify-center rounded-lg", {
  variants: {
    color: CategoryColorVariants,
  },
  defaultVariants: {
    color: "blue",
  },
});

interface CategoryIconContainerProps {
  color?: VariantProps<typeof categoryIconVariants>["color"];
  icon: keyof typeof CategoryIconMap;
}

function CategoryIconContainer({ icon, color }: CategoryIconContainerProps) {
  const Icon = CategoryIconMap[icon] || CategoryIconMap.asterisk;
  return (
    <div className={categoryIconVariants({ color })}>
      <Icon className="size-5" />
    </div>
  );
}

export function TransactionsContent({ transactions, categories }: TransactionsContentProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [periodFilter, setPeriodFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível excluir a transação");
      }
    },
    onCompleted: () => {
      toast.success("Transação excluída com sucesso");
    },
    refetchQueries: [
      { query: DASHBOARD_LIST_TRANSACTIONS_QUERY },
      { query: DASHBOARD_LIST_CATEGORIES_QUERY },
    ],
  });

  const uniquePeriods = useMemo(() => {
    const periodsMap = new Map<string, { label: string; value: string }>();

    transactions.forEach((t) => {
      if (!t.date) return;
      const dateParts = t.date.split("T")[0].split("-");
      if (dateParts.length === 3) {
        const year = dateParts[0];
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const monthName = MONTH_NAMES[monthIndex];

        const label = `${monthName} / ${year}`;
        const value = `${year}-${dateParts[1]}`;
        periodsMap.set(value, { label, value });
      }
    });

    return Array.from(periodsMap.values()).sort((a, b) => b.value.localeCompare(a.value));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (search && !t.description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (typeFilter !== "ALL" && t.type !== typeFilter) {
        return false;
      }

      if (categoryFilter !== "ALL" && t.category.id !== categoryFilter) {
        return false;
      }

      if (periodFilter !== "ALL") {
        if (!t.date) return false;
        const dateParts = t.date.split("T")[0].split("-");
        if (dateParts.length === 3) {
          const periodVal = `${dateParts[0]}-${dateParts[1]}`;
          if (periodVal !== periodFilter) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    });
  }, [transactions, search, typeFilter, categoryFilter, periodFilter]);

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handleFilterChange = (filterType: "search" | "type" | "category" | "period", value: string) => {
    if (filterType === "search") setSearch(value);
    if (filterType === "type") setTypeFilter(value);
    if (filterType === "category") setCategoryFilter(value);
    if (filterType === "period") setPeriodFilter(value);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    deleteTransaction({ variables: { transactionId: id } });
  };

  const startItemIdx = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="flex-1 max-w-sm">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar transação pelo nome..."
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={typeFilter} onValueChange={(val) => handleFilterChange("type", val ?? "ALL")}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[150px] z-50">
              <SelectItem value="ALL">Todos os tipos</SelectItem>
              <SelectItem value="INCOME">Entradas</SelectItem>
              <SelectItem value="EXPENSE">Saídas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={(val) => handleFilterChange("category", val ?? "ALL")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[180px] z-50">
              <SelectItem value="ALL">Todas as categorias</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={periodFilter} onValueChange={(val) => handleFilterChange("period", val ?? "ALL")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os períodos" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[180px] z-50">
              <SelectItem value="ALL">Todos os períodos</SelectItem>
              {uniquePeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <span className="text-sm text-muted-foreground font-medium">Nenhuma transação encontrada</span>
            <span className="text-xs text-muted-foreground/60 mt-1">Experimente mudar seus filtros de busca</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descrição & Data</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Categoria</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Tipo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Valor</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedTransactions.map((t) => {
                  const isIncome = t.type === "INCOME";
                  const ValueIcon = TransactionTypeIconMap[t.type];

                  let localFormattedDate = t.date;
                  if (t.date) {
                    const dateParts = t.date.split("T")[0].split("-");
                    if (dateParts.length === 3) {
                      const year = dateParts[0];
                      const month = MONTH_NAMES[parseInt(dateParts[1], 10) - 1];
                      const day = parseInt(dateParts[2], 10);
                      localFormattedDate = `${day} de ${month.toLowerCase()} de ${year}`;
                    }
                  }

                  return (
                    <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <CategoryIconContainer icon={t.category.icon} color={t.category.color} />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">{t.description}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">{localFormattedDate}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <CategoryTag color={t.category.color}>{t.category.name}</CategoryTag>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <ValueIcon className={`size-4 ${TransactionTypeColorVariants[t.type]}`} />
                          <span className={`text-xs font-semibold ${TransactionTypeColorVariants[t.type]}`}>
                            {isIncome ? "Entrada" : "Saída"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`text-sm font-bold ${TransactionTypeColorVariants[t.type]}`}>
                          {isIncome ? "+" : "-"}
                          {" "}
                          R$
                          {" "}
                          {formatMoney(Math.abs(t.amount), {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <EditTransactionDialog transaction={t} categories={categories} />
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleDelete(t.id)}
                            className="hover:bg-financy-feedback-danger-light hover:text-financy-feedback-danger"
                          >
                            <Trash className="size-4 text-financy-feedback-danger" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <span className="text-xs text-muted-foreground">
            <span className="font-medium mr-1 text-foreground">{startItemIdx}</span>
            a
            <span className="font-medium mx-1 text-foreground">{endItemIdx}</span>
            |
            <span className="font-medium mx-1 text-foreground">{totalItems}</span>
            resultados
          </span>

          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  size="icon-sm"
                  href="#"
                  text=""
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {getPageNumbers().map((page, idx) => (
                <PaginationItem key={idx}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      size="icon-sm"
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
