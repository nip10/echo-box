import { ComponentChildren } from "preact";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/styles";

const iconButtonVariants = cva(
  // Base styles
  "hover:cursor-pointer",
  {
    variants: {
      variant: {
        ghost: "text-gray-400 hover:text-gray-600",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  }
);

interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  onClick?: () => void;
  children: ComponentChildren;
  className?: string;
  "aria-label": string;
}

export function IconButton({
  onClick,
  children,
  className,
  "aria-label": ariaLabel,
  variant,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(iconButtonVariants({ variant }), className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
