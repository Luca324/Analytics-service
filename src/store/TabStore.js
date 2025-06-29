import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// persist автоматически сохраняет состояние в localStorage
const useTabStore = create(
    persist((set) => ({
        activeTab: "uploader",
        setActiveTab: (tab) => set({ activeTab: tab }),
    }),
        { name: 'tab-storage' }
    ))

export { useTabStore }
