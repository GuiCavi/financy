import { Asterisk, BaggageClaim, BookOpen, BriefcaseBusiness, CarFront, CircleArrowDown, CircleArrowUp, Dumbbell, Gift, HeartPulse, House, Mailbox, PawPrint, PiggyBank, ReceiptText, ShoppingCart, Ticket, ToolCase, Utensils } from "lucide-react";

import { TransactionValueType } from "@/types/transaction";

export type CategoryColor = "blue" | "purple" | "pink" | "red" | "orange" | "yellow" | "green";

export const CategoryColors: CategoryColor[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green"];

export const CategoryIconMap = {
  mailbox: Mailbox,
  bookOpen: BookOpen,
  gift: Gift,
  heartPulse: HeartPulse,
  house: House,
  pawPrint: PawPrint,
  baggageClaim: BaggageClaim,
  briefcaseBusiness: BriefcaseBusiness,
  ticket: Ticket,
  dumbbell: Dumbbell,
  piggyBank: PiggyBank,
  utensils: Utensils,
  shoppingCart: ShoppingCart,
  receiptText: ReceiptText,
  toolCase: ToolCase,
  carFront: CarFront,
  asterisk: Asterisk,
} as const;

export const TransactionTypeIconMap = {
  [TransactionValueType.INCOME]: CircleArrowUp,
  [TransactionValueType.EXPENSE]: CircleArrowDown,
} as const;
