import { useTranslation } from '@/shared/lib'
import { Combobox } from '@/shared/ui/combobox'

type ExerciseSelectorProps = {
  exercises: { label: string; value: number }[]
  defaultValue: number
  onSelect: (value: number | null) => void
}

export const ExerciseSelector = ({ exercises, defaultValue, onSelect }: ExerciseSelectorProps) => {
  const { t } = useTranslation()

  return (
    <Combobox
      placeholder={t('select-exercise')}
      defaultValue={defaultValue}
      options={exercises}
      onSelect={onSelect}
    />
  )
}
