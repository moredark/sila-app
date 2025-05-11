import type { Meta, StoryObj } from '@storybook/react'

import { UserInfo } from '../UserInfo'

const meta = {
  title: 'Widgets/UserInfo',
  component: UserInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserInfo>

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    user: {
      id: '1',
      username: 'aleksandr',
      email: 'alex@example.com',
      avatar_url: 'https://github.com/shadcn.png',
    },
  },
}

export const WithoutAvatar: Story = {
  args: {
    user: {
      id: '2',
      username: 'julia',
      email: 'julia@example.com',
      avatar_url: '',
    },
  },
}
