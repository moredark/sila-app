import { FC } from 'react'

import { MuscleGroup } from '@/entities/muscle-group/model'
import { Combobox } from '@/shared/ui/combobox'

interface MuscleGroupSelectProps {
  muscleGroups: MuscleGroup[]
  onSelect: (id: number | undefined) => void
  placeholder: string
}

export const MuscleGroupSelect: FC<MuscleGroupSelectProps> = ({
  muscleGroups,
  onSelect,
  placeholder,
}) => (
  <div className="flex items-center gap-2">
    <Combobox
      placeholder={placeholder}
      options={
        muscleGroups?.map(group => ({
          label: group.name,
          value: group.id,
        })) || []
      }
      onSelect={onSelect}
    />
  </div>
)
