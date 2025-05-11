import { useTranslation } from '@/shared/lib'
import { Combobox } from '@/shared/ui/combobox'

type ExerciseSelectorProps = {
  exercises: { label: string; value: number }[]
  defaultValue: number
  onSelect: (value: number | undefined) => void
}

export const ExerciseSelector = ({ exercises, defaultValue, onSelect }: ExerciseSelectorProps) => {
  const t = useTranslation()

  return (
    <Combobox
      data-testid="exercise-selector"
      placeholder={t('select-exercise')}
      searchPlaceholder={t('search')}
      defaultValue={defaultValue}
      options={exercises}
      onSelect={onSelect}
    />
  )
}
