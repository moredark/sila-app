import { formatDate } from '../formatDate'

describe('formatDate', () => {
  it('should return empty string for undefined input', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('should format date in DD.MM.YYYY format', () => {
    const date = new Date(2025, 4, 15) // Месяцы в JS начинаются с 0, поэтому 4 = май
    expect(formatDate(date.toString())).toBe('15.05.2025')
  })

  it('should add leading zeros to day and month when needed', () => {
    const date = new Date(2025, 0, 5) // 5 января 2025
    expect(formatDate(date.toString())).toBe('05.01.2025')
  })

  it('should handle different date formats', () => {
    const date = new Date(2025, 6, 10) // 10 июля 2025
    expect(formatDate(date.toString())).toBe('10.07.2025')
  })

  it('should handle full date-time strings without timezone issues', () => {
    const date = new Date('2025-12-31T12:00:00')
    expect(formatDate(date.toString())).toBe('31.12.2025')
  })

  it('should handle dates with single-digit days and months correctly', () => {
    const date = new Date(2025, 1, 3) // 3 февраля 2025
    expect(formatDate(date.toString())).toBe('03.02.2025')
  })

  it('should work with specific date string format', () => {
    const dateStr = 'Mon Jan 15 2025'
    expect(formatDate(dateStr)).toBe('15.01.2025')
  })
})
