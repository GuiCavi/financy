import { Asterisk, BaggageClaim, BookOpen, BriefcaseBusiness, CarFront, CircleArrowDown, CircleArrowUp, Dumbbell, Gift, HeartPulse, House, Mailbox, PawPrint, PiggyBank, ReceiptText, ShoppingCart, Ticket, ToolCase, Utensils } from "lucide-react";

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
  INCOME: CircleArrowUp,
  EXPENSE: CircleArrowDown,
} as const;
