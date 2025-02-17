'use client'

import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

import { cn } from '../lib'

interface ComboboxProps<T> {
  options: { label: string; value: T }[]
  onSelect: (value: T | undefined) => void
  placeholder?: string
  searchPlaceholder?: string
  defaultValue?: T
  className?: string
}

export function Combobox<T extends string | number>({
  options,
  onSelect,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  defaultValue,
  className,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<T | undefined>(defaultValue || undefined)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    setValue(defaultValue || undefined)
  }, [defaultValue])

  const filteredOptions = search
    ? options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))
    : options

  const handleSelect = (selectedValue: T) => {
    const newValue = selectedValue === value ? undefined : selectedValue
    setValue(newValue)
    onSelect(newValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value ? options.find(option => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.label.toLowerCase()}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
