import clsx from "clsx";

export function cn(...inputs: (string|undefined)[]) {
  return clsx(inputs);
}