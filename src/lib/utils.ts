import clsx from "clsx";

export function cn(...inputs: (string|boolean|undefined)[]) {
  return clsx(inputs);
}