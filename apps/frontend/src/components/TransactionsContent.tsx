import { useMutation } from "@apollo/client/react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpDown, Search, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { CategoryTag } from "@/components/CategoryItem";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql";
import { DELETE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import type { DashboardListCategoriesOutput } from "@/types/category";
import { type DashboardListTransactionsOutput, TranscationValueLabel } from "@/types/transaction";
import { CategoryColorVariants, TransactionTypeColorVariants } from "@/utils/colors";
import { handleGraphQLErrors } from "@/utils/graphql";
import { CategoryIconMap, TransactionTypeIconMap } from "@/utils/icons";
import { formatDate } from "@/utils/text";

import { AddTransactionDialog } from "./AddTransactionDialog";
import { TransactionAmount } from "./TransactionItem";

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

const TypeLabels = {
  ALL: "Todos",
  INCOME: "Entrada",
  EXPENSE: "Saída",
} as const;

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

const columnHelper = createColumnHelper<Transaction>();
const ITEMS_PER_PAGE = 10;

export function TransactionsContent({ transactions, categories }: TransactionsContentProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [periodFilter, setPeriodFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível excluir a transação"));
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

  const handleDelete = useCallback((id: string) => {
    deleteTransaction({ variables: { transactionId: id } });
  }, [deleteTransaction]);

  const startItemIdx = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const columns = useMemo(
    () => [
      columnHelper.accessor("description", {
        header: () => <div className="text-left">Descrição</div>,
        cell: ({ row }) => {
          const t = row.original;

          return (
            <div className="flex items-center gap-4">
              <CategoryIconContainer icon={t.category.icon} color={t.category.color} />
              <span className="text-sm font-semibold text-foreground">{t.description}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("date", {
        header: () => "Data",
        cell: (props) => <span className="text-xs text-foreground">{formatDate(props.row.original.date)}</span>,
      }),
      columnHelper.accessor("category", {
        header: () => "Categoria",
        cell: (props) => <CategoryTag color={props.row.original.category.color}>{props.row.original.category.name}</CategoryTag>,
      }),
      columnHelper.accessor("type", {
        header: () => "Tipo",
        cell: (props) => {
          const t = props.row.original;
          const typeColor = TransactionTypeColorVariants[t.type];
          const ValueIcon = TransactionTypeIconMap[t.type];

          return (
            <div className="flex items-center justify-center gap-1.5">
              <ValueIcon className={`size-4 ${typeColor}`} />
              <span className={`text-sm font-semibold ${typeColor}`}>
                {TranscationValueLabel[t.type]}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("amount", {
        header: () => <div className="text-right">Valor</div>,
        cell: (props) => (
          <div className="flex justify-end">
            <TransactionAmount amount={props.row.original.amount} type={props.row.original.type} />
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-right">Ações</div>,
        cell: (props) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => handleDelete(props.row.original.id)}
              className="hover:bg-financy-feedback-danger-light hover:text-financy-feedback-danger"
            >
              <Trash className="size-4 text-financy-feedback-danger" />
            </Button>
            <EditTransactionDialog transaction={props.row.original} categories={categories} />
          </div>
        ),
      }),
    ],
    [categories, handleDelete],
  );

  const table = useReactTable({
    data: paginatedTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: ITEMS_PER_PAGE,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex: currentPage - 1,
          pageSize: ITEMS_PER_PAGE,
        });
        setCurrentPage(newState.pageIndex + 1);
      }
    },
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 bg-card border border-border p-4 rounded-xl">
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <span className="text-xs text-muted-foreground">Buscar</span>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar por descrição"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <span className="text-xs text-muted-foreground">Tipo</span>
          <Select value={TypeLabels[typeFilter]} onValueChange={(val) => handleFilterChange("type", val ?? "ALL")} >
            <SelectTrigger className="w-full" size="lg">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[150px] z-50" alignItemWithTrigger={false}>
              {Object.entries(TypeLabels).map(([key, value]) => <SelectItem value={key}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <span className="text-xs text-muted-foreground">Categoria</span>
          <Select
            value={findSelectedCategory(categories, categoryFilter)}
            onValueChange={(val) => handleFilterChange("category", val ?? "ALL")}
          >
            <SelectTrigger className="w-full" size="lg">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[180px] z-50" alignItemWithTrigger={false}>
              <SelectItem value="ALL">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <span className="text-xs text-muted-foreground">Período</span>
          <Select
            value={findSelectedPeriod(uniquePeriods, periodFilter)}
            onValueChange={(val) => handleFilterChange("period", val ?? "ALL")}
          >
            <SelectTrigger className="w-full" size="lg">
              <SelectValue placeholder="Todos os períodos" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border rounded-md shadow-lg p-1 min-w-[180px] z-50" alignItemWithTrigger={false}>
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

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {totalItems === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ArrowUpDown />
              </EmptyMedia>
              <EmptyTitle>Nenhuma transação encontrada</EmptyTitle>
              <EmptyDescription>Experimente adicionar uma nova transação</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <AddTransactionDialog categories={categories}>
                <Button variant="outline" size="sm">Nova transação</Button>
              </AddTransactionDialog>
            </EmptyContent>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-6 py-4 font-medium text-xs uppercase text-muted-foreground text-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/10 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4 whitespace-nowrap text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

function findSelectedPeriod(uniquePeriods: { label: string; value: string }[], periodFilter: string): string {
  return uniquePeriods.find((cat) => cat.value === periodFilter)?.label ?? "Todos";
}

function findSelectedCategory(categories: Category[], categoryFilter: string): string {
  return categories.find((cat) => cat.id === categoryFilter)?.name ?? "Todas";
}
