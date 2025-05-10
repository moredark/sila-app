import { ReactElement } from 'react'

import { render, RenderOptions } from '@testing-library/react'

// Create a custom render function that includes any global providers
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    // Wrap component in providers if needed
    wrapper: ({ children }) => children,
    ...options,
  })
}

// Helper to query portal elements
export function queryPortalRoot() {
  return document.querySelector('body > div[data-radix-portal]')
}

// Helper to find elements in the portal
export function queryAllByTextInPortal(text: string) {
  const portal = queryPortalRoot()
  if (!portal) return []

  return Array.from(portal.querySelectorAll('*')).filter(el =>
    el.textContent?.includes(text),
  ) as HTMLElement[]
}
