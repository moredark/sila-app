import React, { FC, useState } from 'react'

import { Search, XIcon } from 'lucide-react'

import { components } from '@/shared/api/schema'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Combobox } from '@/shared/ui/combobox'
import { Input } from '@/shared/ui/input'

interface ExerciseSearchProps {
  onSearch: (query: string) => void
  onSelectMuscleGroup: (id: number | null) => void
  onResetFilters: () => void
  muscleGroups: components['schemas']['models.GetMuscleGroupsResponse'][]
}

export const ExerciseSearch: FC<ExerciseSearchProps> = ({
  onSearch,
  onSelectMuscleGroup,
  onResetFilters,
  muscleGroups,
}) => {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          placeholder={t('search-exercises')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2">
        <div className="grow">
          <Combobox
            placeholder={t('select-muscle-group')}
            options={
              muscleGroups?.map(group => ({
                label: group.name,
                value: group.id,
              })) || []
            }
            onSelect={onSelectMuscleGroup}
          />
        </div>
        <Button variant="outline" onClick={onResetFilters} className="h-10">
          <XIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
