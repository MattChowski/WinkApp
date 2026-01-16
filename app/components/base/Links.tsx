import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'

const linkVariants = cva('w-fit transition-colors focus:outline-2 focus:outline-blue-500 rounded-sm', {
  variants: {
    intent: {
      primary: 'text-primary hover:text-secondary font-semibold',
      secondary: 'text-secondary hover:text-secondary/80 font-semibold',
      tertiary: 'text-tertiary/50 hover:text-tertiary font-medium',
    },
    size: {
      small: ['text-sm'],
      medium: ['text-base'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

interface LinkToProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  to: string
  children: React.ReactNode
}

const LinkTo = ({ to, intent, size, children, className, ...props }: LinkToProps) => {
  return (
    <a href={to} className={linkVariants({ intent, size, className })} {...props}>
      {children}
    </a>
  )
}

export { LinkTo }
