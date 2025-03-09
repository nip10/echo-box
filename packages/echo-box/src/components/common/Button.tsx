import { ComponentChildren } from "preact";
import { Loader2 } from "lucide-preact";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/styles";

const buttonVariants = cva(
  // Base styles
  "rounded-lg transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "py-1 px-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200",
        secondary: "py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300",
        category:
          "bg-gray-50 hover:bg-gray-100 p-4 flex flex-col items-center space-y-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: ComponentChildren;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
  title?: string;
}

export function Button({
  onClick,
  disabled,
  loading = false,
  variant,
  fullWidth,
  children,
  className,
  type = "button",
  "aria-label": ariaLabel,
  title,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, fullWidth }), className)}
      type={type}
      aria-label={ariaLabel}
      title={title}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
