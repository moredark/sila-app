import { screen, within } from '@testing-library/react'

// Получает root элемент портала Radix UI
export function getRadixPortalRoot(): HTMLElement | null {
  return document.querySelector('body > div[data-radix-popper-content-wrapper]')
}

// Ищет элемент внутри портала по роли
export function getByRoleInPortal(
  role: string,
  options?: Parameters<typeof screen.getByRole>[1],
): HTMLElement {
  const portal = getRadixPortalRoot()
  if (!portal) {
    throw new Error('Radix portal not found in the document')
  }

  return within(portal).getByRole(role, options)
}

// Ищет элемент внутри портала по тексту
export function getByTextInPortal(text: string | RegExp): HTMLElement {
  const portal = getRadixPortalRoot()
  if (!portal) {
    throw new Error('Radix portal not found in the document')
  }

  return within(portal).getByText(text)
}

// Ищет все элементы по тексту внутри портала
export function getAllByTextInPortal(text: string | RegExp): HTMLElement[] {
  const portal = getRadixPortalRoot()
  if (!portal) {
    return []
  }

  return within(portal).getAllByText(text)
}

// Проверяет наличие текста в портале
export function queryByTextInPortal(text: string | RegExp): HTMLElement | null {
  const portal = getRadixPortalRoot()
  if (!portal) {
    return null
  }

  return within(portal).queryByText(text)
}
