import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleCopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success("Promo code copied to clipboard!");
    },
    () => {
      toast.error("Failed to copy promo code to clipboard.");
    }
  );
};
