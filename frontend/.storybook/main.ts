import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],

  viteFinal: async config => {
    config.resolve = config.resolve || {}

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/navigation': path.resolve(__dirname, './nextjs-mock.js'),
      '@/shared/lib': path.resolve(__dirname, './translations-mock.js'),
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },
}

export default config
