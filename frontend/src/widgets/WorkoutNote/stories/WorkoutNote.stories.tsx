import type { Meta, StoryObj } from '@storybook/react'

import { WorkoutNote } from '../WorkoutNote'

const meta = {
  title: 'Widgets/WorkoutNote',
  component: WorkoutNote,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WorkoutNote>

export default meta
type Story = StoryObj<typeof meta>

export const ShortNote: Story = {
  args: {
    note: 'Это была хорошая тренировка!',
  },
}

export const LongNote: Story = {
  args: {
    note: 'Сегодня я увеличил рабочий вес на жиме лежа на 5 кг. Чувствую себя сильнее, но нужно больше работать над техникой выполнения. В следующий раз попробую сделать больше повторений с текущим весом перед дальнейшим увеличением нагрузки.',
  },
}
