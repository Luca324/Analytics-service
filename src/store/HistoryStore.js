import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// persist автоматически сохраняет состояние в localStorage
const useHistoryStore = create(
    persist(set => ({
        history: {},

        addHistoryItem: (item) => set(state => {
            const id = Date.now()
            state.history[id] = item

            return { history: state.history }
        }),

        removeHistoryItem: (id) => set(state => {
            const newHistory = { ...state.history };
            delete newHistory[id];
            return { history: newHistory };
        }),

        clearHistory: () => set({ history: {} })
    }))
)

export { useHistoryStore }