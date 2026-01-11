import { Description, Field, Input, Label } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

const inputVariants = cva(
  "block w-full rounded-lg border bg-transparent px-4 py-3 outline-2 transition-[outline-color] duration-200 ease-in-out data-disabled:cursor-not-allowed data-disabled:opacity-50 placeholder:text-tertiary/40 ",
  {
    variants: {
      intent: {
        default: "",
      },
      error: {
        true: "text-red-500 outline-red-500 focus:outline-red-500 focus:outline-3 autofill:[-webkit-text-fill-color:var(--color-red-500)] border-red-500",
        false:
          "text-tertiary outline-transparent focus:outline-blue-500 autofill:[-webkit-text-fill-color:var(--color-tertiary)] border-tertiary/30",
      },
      hasIcon: {
        true: "pl-10",
        false: "",
      },
    },
    defaultVariants: {
      intent: "default",
      error: false,
      hasIcon: false,
    },
  },
);

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  icon?: LucideIcon;
  error?: boolean;
  errorMessage?: string;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ label, description, icon: Icon, error = false, errorMessage, intent, className, ...props }, inputRef) => {
    return (
      <Field className="w-full">
        {label && <Label className="text-tertiary mb-2 text-sm font-semibold">{label}</Label>}
        {description && <Description className="text-tertiary/75 text-sm font-light">{description}</Description>}
        <div className={`relative ${label || description ? "mt-2" : ""}`}>
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <Icon className={`ml-3 h-5 w-5 ${error ? "text-red-500/40" : "text-tertiary/40"}`} />
            </div>
          )}
          <Input
            ref={inputRef}
            className={inputVariants({
              intent,
              error,
              hasIcon: !!Icon,
              className,
            })}
            {...props}
          />
        </div>
        {errorMessage && <p className="mt-1 text-sm text-red-400">{errorMessage}</p>}
      </Field>
    );
  },
);

export { InputComponent, inputVariants };
