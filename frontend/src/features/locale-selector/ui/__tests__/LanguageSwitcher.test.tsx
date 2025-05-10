import React from 'react'

import { render, screen } from '@testing-library/react'

import { useTranslation } from '@/shared/lib'

import { useLanguage } from '../../model/useLanguage'
import { LanguageSwitcher } from '../LanguageSwitcher'

jest.mock('../../model/useLanguage')
jest.mock('@/shared/lib', () => ({
  useTranslation: jest.fn(),
}))

describe('LanguageSwitcher', () => {
  const mockChangeLanguage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useLanguage as jest.Mock).mockReturnValue({
      currentLanguage: 'en',
      changeLanguage: mockChangeLanguage,
    })
    ;(useTranslation as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        'select-language': 'Select Language',
        english: 'English',
        russian: 'Russian',
      }
      return translations[key] || key
    })
  })

  it('should render component with current language', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByText('Select Language')).toBeInTheDocument()
  })

  it('should display language selection text', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Select Language')).toBeInTheDocument()
  })

  it('should use currentLanguage from useLanguage hook', () => {
    ;(useLanguage as jest.Mock).mockReturnValue({
      currentLanguage: 'ru',
      changeLanguage: mockChangeLanguage,
    })

    render(<LanguageSwitcher />)

    expect(useLanguage).toHaveBeenCalled()
  })
})
