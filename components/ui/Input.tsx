import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 text-sm bg-white border border-ink-300 rounded-lg text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-colors",
        className
      )}
      {...props}
    />
  );
}
