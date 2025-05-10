import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../button'

describe('Button', () => {
  it('should render button with correct text', () => {
    render(<Button>Тестовая кнопка</Button>)

    expect(screen.getByRole('button', { name: /тестовая кнопка/i })).toBeInTheDocument()
  })

  it('should support different style variants', () => {
    const { rerender } = render(<Button variant="default">Стандартная</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary')

    rerender(<Button variant="destructive">Деструктивная</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')

    rerender(<Button variant="outline">Контурная</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-input')
  })

  it('should support different sizes', () => {
    const { rerender } = render(<Button size="default">Стандартный</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10')

    rerender(<Button size="sm">Маленький</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-9')

    rerender(<Button size="lg">Большой</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-11')
  })

  it('should be accessible via keyboard', async () => {
    const mockOnClick = jest.fn()
    render(<Button onClick={mockOnClick}>Кликабельная</Button>)

    const button = screen.getByRole('button')
    await userEvent.tab()
    expect(button).toHaveFocus()

    await userEvent.keyboard('{enter}')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should support asChild mode', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Ссылка</a>
      </Button>,
    )

    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByText('Ссылка')).toHaveAttribute('href', 'https://example.com')
  })
})
