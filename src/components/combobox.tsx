"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { value: number; label: string }[];
  value: number | null;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  emptyText?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  emptyText = "No option found."
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption =
    value !== null ? options.find((option) => option.value === value) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-8 justify-between cursor-pointer bg-transparent text-left font-normal px-3 py-1"
        >
          <span className="truncate overflow-hidden text-ellipsis">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[25rem] p-0 z-50"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search..." className="h-8 pl-2" />
          <CommandList className="overflow-hidden">
            <CommandEmpty className="py-6 text-center text-sm">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              <div
                className="max-h-[200px] overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 #f1f5f9"
                }}
                onWheel={(e) => {
                  // Ensure mouse wheel events are handled properly
                  e.stopPropagation();
                }}
              >
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onValueChange(
                        option.value === value ? null : option.value
                      );
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 px-2 py-2 aria-selected:bg-gray-100"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate overflow-hidden text-ellipsis flex-1">
                      {option.label}
                    </span>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
