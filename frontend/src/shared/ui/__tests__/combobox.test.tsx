import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  getRadixPortalRoot,
  getByRoleInPortal,
  getByTextInPortal,
  queryByTextInPortal,
} from '@/shared/lib/test-utils'

import { Combobox } from '../combobox'

describe('Combobox', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]
  const onSelectMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with placeholder text', () => {
    render(<Combobox options={options} onSelect={onSelectMock} placeholder="Select item" />)

    expect(screen.getByText('Select item')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render with default value', () => {
    render(<Combobox options={options} onSelect={onSelectMock} defaultValue="option2" />)

    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('should open dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} />)

    const combobox = screen.getByRole('combobox')
    await user.click(combobox)

    const portal = getRadixPortalRoot()
    expect(portal).not.toBeNull()
  })

  it('should apply custom class name', () => {
    render(<Combobox options={options} onSelect={onSelectMock} className="custom-class" />)

    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })

  it('should show search placeholder', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} searchPlaceholder="Find options" />)

    const combobox = screen.getByRole('combobox')
    await user.click(combobox)

    const inputInPortal = getByRoleInPortal('combobox')
    expect(inputInPortal).toHaveAttribute('placeholder', 'Find options')
  })

  it('should display all options when opened', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} />)

    const combobox = screen.getByRole('combobox')
    await user.click(combobox)

    const portal = getRadixPortalRoot()
    expect(portal).not.toBeNull()

    expect(getByTextInPortal('Option 1')).toBeInTheDocument()
    expect(getByTextInPortal('Option 2')).toBeInTheDocument()
    expect(getByTextInPortal('Option 3')).toBeInTheDocument()
  })

  it('should filter options when typing in search', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} />)

    await user.click(screen.getByRole('combobox'))

    const searchInput = getByRoleInPortal('combobox')
    await user.type(searchInput, '1')

    expect(getByTextInPortal('Option 1')).toBeInTheDocument()
    expect(queryByTextInPortal('Option 2')).not.toBeInTheDocument()
    expect(queryByTextInPortal('Option 3')).not.toBeInTheDocument()
  })

  it('should call onSelect when an option is clicked', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} />)

    await user.click(screen.getByRole('combobox'))

    const option = getByTextInPortal('Option 2')
    await user.click(option)

    expect(onSelectMock).toHaveBeenCalledWith('option2')
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('should clear selection when selecting the active option again', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} defaultValue="option1" />)

    expect(screen.getByText('Option 1')).toBeInTheDocument()

    await user.click(screen.getByRole('combobox'))

    const option = getByTextInPortal('Option 1')
    await user.click(option)

    expect(onSelectMock).toHaveBeenCalledWith(undefined)
  })

  it('should show "No options found" when search has no matches', async () => {
    const user = userEvent.setup()
    render(<Combobox options={options} onSelect={onSelectMock} />)

    await user.click(screen.getByRole('combobox'))

    const searchInput = getByRoleInPortal('combobox')
    await user.type(searchInput, 'xyz')

    expect(getByTextInPortal('No options found.')).toBeInTheDocument()
  })

  it('should update selection when defaultValue prop changes', () => {
    const { rerender } = render(
      <Combobox options={options} onSelect={onSelectMock} defaultValue="option1" />,
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()

    rerender(<Combobox options={options} onSelect={onSelectMock} defaultValue="option3" />)

    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })
})
