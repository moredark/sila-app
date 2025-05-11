// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Meta, StoryObj } from '@storybook/react'

import { SetsTable } from '../SetsTable'

const meta = {
  title: 'Widgets/SetsTable',
  component: SetsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SetsTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sets: [
      { id: '1', weight: 60, reps: 10 },
      { id: '2', weight: 65, reps: 8 },
      { id: '3', weight: 70, reps: 6 },
    ],
  },
}

export const ManySetsSample: Story = {
  args: {
    sets: [
      { id: '1', weight: 40, reps: 15 },
      { id: '2', weight: 50, reps: 12 },
      { id: '3', weight: 60, reps: 10 },
      { id: '4', weight: 70, reps: 8 },
      { id: '5', weight: 80, reps: 6 },
    ],
  },
}
