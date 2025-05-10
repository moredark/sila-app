import { formatTime } from '../formatTime'

describe('formatTime', () => {
  it('should format 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00')
  })

  it('should format seconds less than 10 with leading zero', () => {
    expect(formatTime(5)).toBe('00:05')
  })

  it('should format seconds between 10 and 59 correctly', () => {
    expect(formatTime(45)).toBe('00:45')
  })

  it('should format exactly 1 minute correctly', () => {
    expect(formatTime(60)).toBe('01:00')
  })

  it('should format minutes and seconds correctly', () => {
    expect(formatTime(125)).toBe('02:05') // 2 minutes 5 seconds
  })

  it('should handle large time values', () => {
    expect(formatTime(3661)).toBe('61:01') // 61 minutes 1 second
  })

  it('should handle hours worth of seconds', () => {
    expect(formatTime(3600)).toBe('60:00') // 60 minutes
  })

  it('should handle leading zeros for both minutes and seconds', () => {
    expect(formatTime(65)).toBe('01:05') // 1 minute 5 seconds
  })
})
