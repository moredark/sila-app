import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Timer } from '../Timer'

describe('Timer', () => {
  const defaultProps = {
    time: 65, // 1 минута 5 секунд
    isRunning: false,
    onReset: jest.fn(),
    onPauseToggle: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with formatted time', () => {
    render(<Timer {...defaultProps} />)

    expect(screen.getByText('01:05')).toBeInTheDocument()
  })

  it('should render play button when not running', () => {
    render(<Timer {...defaultProps} />)

    const playButton = screen.getByLabelText('Start timer')
    expect(playButton).toBeInTheDocument()
  })

  it('should render pause button when running', () => {
    render(<Timer {...defaultProps} isRunning={true} />)

    const pauseButton = screen.getByLabelText('Pause timer')
    expect(pauseButton).toBeInTheDocument()
  })

  it('should call onPauseToggle when play/pause button is clicked', async () => {
    const user = userEvent.setup()
    render(<Timer {...defaultProps} />)

    const playButton = screen.getByLabelText('Start timer')
    await user.click(playButton)

    expect(defaultProps.onPauseToggle).toHaveBeenCalledTimes(1)
  })

  it('should call onReset when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Timer {...defaultProps} />)

    const resetButton = screen.getByLabelText('Reset timer')
    await user.click(resetButton)

    expect(defaultProps.onReset).toHaveBeenCalledTimes(1)
  })
})
