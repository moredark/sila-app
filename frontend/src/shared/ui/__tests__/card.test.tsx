import React from 'react'

import { render, screen } from '@testing-library/react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card and its subcomponents', () => {
  it('should render card with correct classes', () => {
    render(<Card data-testid="card">Содержимое карточки</Card>)

    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card')
    expect(card).toHaveTextContent('Содержимое карточки')
  })

  it('should render CardHeader with correct classes', () => {
    render(<CardHeader data-testid="card-header">Заголовок карточки</CardHeader>)

    const header = screen.getByTestId('card-header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    expect(header).toHaveTextContent('Заголовок карточки')
  })

  it('should render CardTitle with correct classes', () => {
    render(<CardTitle data-testid="card-title">Заголовок</CardTitle>)

    const title = screen.getByTestId('card-title')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('text-2xl', 'font-semibold')
    expect(title).toHaveTextContent('Заголовок')
  })

  it('should render CardDescription with correct classes', () => {
    render(<CardDescription data-testid="card-description">Описание</CardDescription>)

    const description = screen.getByTestId('card-description')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    expect(description).toHaveTextContent('Описание')
  })

  it('should render CardContent with correct classes', () => {
    render(<CardContent data-testid="card-content">Контент</CardContent>)

    const content = screen.getByTestId('card-content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6', 'pt-0')
    expect(content).toHaveTextContent('Контент')
  })

  it('should render CardFooter with correct classes', () => {
    render(<CardFooter data-testid="card-footer">Футер</CardFooter>)

    const footer = screen.getByTestId('card-footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    expect(footer).toHaveTextContent('Футер')
  })

  it('should properly compose all card elements', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Заголовок карточки</CardTitle>
          <CardDescription>Описание карточки</CardDescription>
        </CardHeader>
        <CardContent>Контент карточки</CardContent>
        <CardFooter>Футер карточки</CardFooter>
      </Card>,
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Заголовок карточки')).toBeInTheDocument()
    expect(screen.getByText('Описание карточки')).toBeInTheDocument()
    expect(screen.getByText('Контент карточки')).toBeInTheDocument()
    expect(screen.getByText('Футер карточки')).toBeInTheDocument()
  })
})
