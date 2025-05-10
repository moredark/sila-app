import { render, screen } from '@testing-library/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../select'

describe('Select', () => {
  const renderSelect = () => {
    return render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Фрукты</SelectLabel>
            <SelectItem value="apple">Яблоко</SelectItem>
            <SelectItem value="banana">Банан</SelectItem>
            <SelectItem value="orange">Апельсин</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render select with placeholder', () => {
    renderSelect()

    const trigger = screen.getByTestId('select-trigger')
    expect(trigger).toBeInTheDocument()
    expect(screen.getByText('Выберите опцию')).toBeInTheDocument()
  })

  it('should render with initial value', () => {
    render(
      <Select defaultValue="orange">
        <SelectTrigger data-testid="select-trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Яблоко</SelectItem>
          <SelectItem value="banana">Банан</SelectItem>
          <SelectItem value="orange">Апельсин</SelectItem>
        </SelectContent>
      </Select>,
    )

    expect(screen.getByText('Апельсин')).toBeInTheDocument()
  })

  it('should render disabled state correctly', () => {
    render(
      <Select disabled>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Отключено" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Тестовая опция</SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByTestId('select-trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toBeDisabled()
  })

  it('should apply custom className to trigger', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger-class" data-testid="select-trigger">
          <SelectValue placeholder="С кастомным классом" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Тестовая опция</SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByTestId('select-trigger')
    expect(trigger).toHaveClass('custom-trigger-class')
  })
})
