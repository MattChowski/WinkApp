import type { ReactNode } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Button } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

interface SidebarAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  action?: ReactNode;
}

const SidebarAccordion = ({ title, children, defaultOpen = true, action }: SidebarAccordionProps) => {
  return (
    <Disclosure as="div" defaultOpen={defaultOpen} className="">
      <div className="group/accordion flex items-center rounded-lg px-3 py-1 hover:bg-white/10">
        <DisclosureButton className="group flex flex-1 cursor-pointer items-center gap-2 text-left text-sm font-medium text-white">
          <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-open:rotate-180" />
          <span>{title}</span>
        </DisclosureButton>
        {action && <div className="opacity-0 transition-opacity group-hover/accordion:opacity-100">{action}</div>}
      </div>
      <DisclosurePanel
        transition
        className="origin-top transition duration-200 ease-out data-closed:-translate-y-2 data-closed:opacity-0"
      >
        <ul className="mt-2 flex flex-col gap-1">{children}</ul>
      </DisclosurePanel>
    </Disclosure>
  );
};

interface SidebarAccordionItemProps {
  children: ReactNode;
  onClick?: () => void;
}

const SidebarAccordionItem = ({ children, onClick }: SidebarAccordionItemProps) => {
  return (
    <li>
      <Button
        className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white"
        onClick={onClick}
      >
        {children}
      </Button>
    </li>
  );
};

export { SidebarAccordion, SidebarAccordionItem };
