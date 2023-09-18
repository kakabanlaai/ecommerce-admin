import * as React from 'react';
import {cn} from '@/lib/utils';

import {Check, X, ChevronsUpDown} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Badge} from '@/components/ui/badge';

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  onRemove,
  className,
  ...props
}: MultiSelectProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? 'h-full' : 'h-10'
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className='flex gap-1 flex-wrap'>
            {options.map((item) =>
              selected.some((selectedItem) => selectedItem === item.value) ? (
                <Badge
                  variant='secondary'
                  key={item.value}
                  className='mr-1 '
                  onClick={() => onRemove(item.value)}
                >
                  {item.label}
                  <button
                    className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onRemove(item.value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => onRemove(item.value)}
                  >
                    <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                  </button>
                </Badge>
              ) : null
            )}
          </div>
          <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command className={className}>
          <CommandInput placeholder='Search ...' />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className='max-h-64 overflow-auto'>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selected.includes(option.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export {MultiSelect};
