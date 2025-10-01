import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmt(d: string) {
  const dt = new Date(d);
  return isNaN(dt as unknown as number) ? d : dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
