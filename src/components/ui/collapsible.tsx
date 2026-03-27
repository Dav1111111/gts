"use client";

import * as React from "react";

// ✅ Simple collapsible implementation to avoid radix-ui import errors
function Collapsible({
  children,
  open,
  onOpenChange,
  ...props
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);
  
  const handleToggle = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <div data-slot="collapsible" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CollapsibleTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, { onClick: handleToggle });
        }
        if (React.isValidElement(child) && child.type === CollapsibleContent) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen });
        }
        return child;
      })}
    </div>
  );
}

function CollapsibleTrigger({
  children,
  onClick,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, { onClick, ...props });
  }
  return (
    <button
      data-slot="collapsible-trigger"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

function CollapsibleContent({
  children,
  isOpen,
  ...props
}: {
  children: React.ReactNode;
  isOpen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="collapsible-content"
      style={{ display: isOpen ? 'block' : 'none' }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
