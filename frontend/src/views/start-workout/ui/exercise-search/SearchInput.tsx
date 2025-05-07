import { ChangeEvent, FC } from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/shared/ui/input'

interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <Input placeholder={placeholder} value={value} onChange={onChange} className="pl-10" />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
  </div>
)
