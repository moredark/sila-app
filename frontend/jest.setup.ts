import '@testing-library/jest-dom'

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

// Mock scrollIntoView
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
}

// Mock Pointer Capture API
if (typeof window !== 'undefined') {
  window.Element.prototype.hasPointerCapture = jest.fn(() => false)
  window.Element.prototype.setPointerCapture = jest.fn()
  window.Element.prototype.releasePointerCapture = jest.fn()
}
