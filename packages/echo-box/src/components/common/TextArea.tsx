import { forwardRef, HTMLAttributes } from "preact/compat";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/styles";

const textAreaVariants = cva(
  "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",
  {
    variants: {
      size: {
        default: "h-24",
        sm: "h-16",
        lg: "h-32",
      },
      variant: {
        default: "border-blue-200",
        error: "border-red-200 focus:ring-red-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

interface TextAreaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textAreaVariants> {
  value?: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { value, placeholder, className, autoFocus, size, variant, ...props },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        className={cn(textAreaVariants({ size, variant }), className)}
        autofocus={autoFocus}
        {...props}
      />
    );
  }
);
