import { create } from 'zustand'

interface TimerState {
  onSetAdded: (() => void) | null
  setOnSetAdded: (callback: (() => void) | null) => void
  triggerSetAdded: () => void
}

export const useTimerStore = create<TimerState>(set => ({
  onSetAdded: null,
  setOnSetAdded: (callback: (() => void) | null) => set({ onSetAdded: callback }),
  triggerSetAdded: () => set(state => {
    state.onSetAdded?.()
    return state
  }),
}))