import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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