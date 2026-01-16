import { Button, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { cva } from 'class-variance-authority'
import { ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'

const sidebarItemVariants = cva('w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors', {
  variants: {
    active: {
      true: 'bg-secondary/15 text-secondary focus:ring-2 focus:ring-secondary outline-none',
      false:
        'text-white/70 hover:bg-white/10 hover:text-white focus:ring-2 transition-shadow outline-none focus:ring-blue-500',
    },
  },
  defaultVariants: {
    active: false,
  },
})

interface SidebarAccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  action?: ReactNode
}

const SidebarAccordion = ({ title, children, defaultOpen = true, action }: SidebarAccordionProps) => {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen} className="">
      <div className="group/accordion flex items-center rounded-lg px-3 py-1 hover:bg-white/10 has-[.peer:focus]:bg-white/10 has-[.peer:focus]:ring-2 has-[.peer:focus]:ring-blue-500">
        <DisclosureButton className="peer group flex flex-1 cursor-pointer items-center gap-2 text-left font-medium text-sm text-white outline-none">
          <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-open:rotate-180" />
          <span>{title}</span>
        </DisclosureButton>
        {action && (
          <div className="rounded-lg opacity-0 transition-opacity group-hover/accordion:opacity-100 peer-focus:opacity-100 has-focus:opacity-100 has-focus:ring-2 has-focus:ring-blue-500">
            {action}
          </div>
        )}
      </div>
      <DisclosurePanel
        transition
        className="origin-top transition duration-200 ease-out data-closed:-translate-y-2 data-closed:opacity-0"
      >
        <ul className="mt-2 flex flex-col gap-1">{children}</ul>
      </DisclosurePanel>
    </Disclosure>
  )
}

interface SidebarAccordionItemProps<T> {
  children: ReactNode
  onClick?: (value: T) => void
  value: T
  active: boolean
}

const SidebarAccordionItem = <T,>({ children, value, onClick, active }: SidebarAccordionItemProps<T>) => {
  const handleClick = () => {
    if (onClick) {
      onClick(value)
    }
  }

  return (
    <li>
      <Button className={sidebarItemVariants({ active })} onClick={handleClick}>
        {children}
      </Button>
    </li>
  )
}

export { SidebarAccordion, SidebarAccordionItem }
