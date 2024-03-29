"use client";

import * as React from "react";
import { CodeIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Spotlight({ filteredBlocks }: any) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search Snippets...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2.5 top-2.2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 py-3 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Text Variants">
            {/* <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem> */}
            {filteredBlocks.map((variant: any, index: number) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  window.location.href = `#${variant.title
                    .toLowerCase()
                    .replace(" ", "-")}`;
                  setOpen(false);
                }}
              >
                <CodeIcon className="mr-2 h-4 w-4" />
                <span>{variant.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}