import { Button } from '@headlessui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, type LucideIcon } from 'lucide-react'

const buttonVariants = cva(
  'text-bold relative cursor-pointer rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 outline-2 focus:outline-2 focus:outline-blue-500 outline-transparent',
  {
    variants: {
      intent: {
        primary: 'bg-primary hover:not-disabled:bg-primary-light text-white',
        secondary: 'bg-secondary hover:not-disabled:bg-secondary-light text-white',
        tertiary: 'bg-gray-200 hover:not-disabled:bg-gray-300 text-gray-800',
        outline: 'border-2 border-primary text-primary hover:not-disabled:bg-primary/10',
        ghost: 'text-primary hover:not-disabled:bg-primary/10',
      },
      size: {
        small: 'px-3 py-2 text-sm',
        medium: 'px-4 py-3 text-base',
        large: 'px-6 py-4 text-lg',
        icon: 'p-1.5',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  label?: string
  icon?: LucideIcon
  isLoading?: boolean
  'aria-label'?: string
}

const PrimaryButton = ({
  label,
  icon: Icon,
  isLoading,
  disabled,
  intent,
  size,
  className,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) => {
  const isIconOnly = Icon && !label
  const accessibleLabel = ariaLabel || label

  return (
    <Button
      className={buttonVariants({ intent, size: isIconOnly && !size ? 'icon' : size, className })}
      disabled={isLoading || disabled}
      aria-label={isIconOnly ? accessibleLabel : undefined}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin" />
        </span>
      )}
      <span className={`flex items-center justify-center gap-2 ${isLoading ? 'invisible' : ''}`}>
        {Icon && <Icon className="h-4 w-4" />}
        {label && <span>{label}</span>}
      </span>
      {isLoading && accessibleLabel && <span className="sr-only">{accessibleLabel}</span>}
    </Button>
  )
}

export { PrimaryButton, buttonVariants }
