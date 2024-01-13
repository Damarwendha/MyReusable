// TYPESCRIPT, TAILWIND, SHADCN
import { ButtonHTMLAttributes } from "react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface BtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

function Btn({ children, className, ...props }: BtnProps) {
  return (
    <Button className={cn("font-semibold flex gap-2", className)} {...props}>
      {children}
    </Button>
  );
}

function Label({ children }: { children: string }) {
  return <span>{children}</span>;
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}

Btn.Icon = Icon;
Btn.Label = Label;

export default Btn;
