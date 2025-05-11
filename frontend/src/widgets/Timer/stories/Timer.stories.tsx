import type { Meta, StoryObj } from '@storybook/react'

import { Timer } from '../Timer'

const meta = {
  title: 'Widgets/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Timer>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {
  args: {
    time: 3600, // 1 hour
    isRunning: true,
    onReset: () => console.log('Timer reset'),
    onPauseToggle: () => console.log('Timer paused'),
  },
}

export const Paused: Story = {
  args: {
    time: 1800, // 30 minutes
    isRunning: false,
    onReset: () => console.log('Timer reset'),
    onPauseToggle: () => console.log('Timer started'),
  },
}

export const ShortTime: Story = {
  args: {
    time: 45, // 45 seconds
    isRunning: true,
    onReset: () => console.log('Timer reset'),
    onPauseToggle: () => console.log('Timer paused'),
  },
}
