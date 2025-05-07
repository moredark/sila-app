import { ChangeEvent, FC, useState } from 'react'

import { useTranslation } from '@/shared/lib'
import { MuscleGroup } from '@/shared/types/entities'

import { MuscleGroupSelect } from './MuscleGroupSelect'
import { SearchInput } from './SearchInput'

interface ExerciseSearchProps {
  onSearch: (query: string) => void
  onSelectMuscleGroup: (id: number | undefined) => void
  muscleGroups: MuscleGroup[]
}

export const ExerciseSearch: FC<ExerciseSearchProps> = ({
  onSearch,
  onSelectMuscleGroup,
  muscleGroups,
}) => {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <div className="space-y-2">
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={t('search-exercises')}
      />

      <MuscleGroupSelect
        muscleGroups={muscleGroups}
        onSelect={onSelectMuscleGroup}
        placeholder={t('select-muscle-group')}
      />
    </div>
  )
}
