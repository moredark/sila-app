import type { Meta, StoryObj } from '@storybook/react'

import { NavigationMenu } from '../NavigationMenu'

const meta = {
  title: 'Widgets/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="flex h-screen w-full flex-col justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
