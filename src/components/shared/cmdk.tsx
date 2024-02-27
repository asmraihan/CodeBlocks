"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  PersonIcon,
  CodeIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Cmdk({ session }: any) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        >
          <span className="hidden lg:inline-flex">Search Snippets...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.7 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                router.push("/");
                setOpen(false);
              }}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/create");
                setOpen(false);
              }}
            >
              <CodeIcon className="mr-2 h-4 w-4" />
              <span>Create</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/explore");
                setOpen(false);
              }}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Explore</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push(`/profile/${session?.user?.name}`);
                setOpen(false);
              }}
            >
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Snippets">
            <CommandItem>
              <ClockIcon className="mr-2 h-4 w-4" />
              <span>Coming Soon</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}