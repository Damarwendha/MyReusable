// TYPESCRIPT, TAILWIND, SHADCN
import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface BtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

const Btn = forwardRef(({ children, className, ...props }: BtnProps, ref) => {
  return (
    <Button
      className={cn("font-semibold flex gap-2", className)}
      ref={ref as Ref<HTMLButtonElement>}
      {...props}
    >
      {children}
    </Button>
  );
});

function Label({ children }: { children: string }) {
  return <span>{children}</span>;
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}

// This needed to avoid ts error when using forwardRef
const BtnAssigned = Object.assign(Btn, { Icon: Icon, Label: Label });

export default BtnAssigned;

