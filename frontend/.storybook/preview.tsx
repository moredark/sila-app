import '../src/app/styles/globals.css'
import React from 'react'
import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../src/app/messages/ru.json'

// Декоратор для next-intl
const withNextIntl = Story => {
  return (
    <NextIntlClientProvider locale="ru" messages={messages}>
      <Story />
    </NextIntlClientProvider>
  )
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#121212',
        },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/workout',
        query: {},
      },
    },
  },
  decorators: [withNextIntl],
}

export default preview
