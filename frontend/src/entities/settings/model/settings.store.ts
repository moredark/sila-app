import { create } from 'zustand'

interface SettingsState {
  shouldRestartOnNewSet: boolean
  setShouldRestartOnNewSet: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>(set => ({
  shouldRestartOnNewSet: true,
  setShouldRestartOnNewSet: (value: boolean) => set({ shouldRestartOnNewSet: value }),
}))