import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTabStore = create(
    persist((set) => ({
        activeTab: "uploader",
        setActiveTab: (tab) => set({ activeTab: tab }),
    }),
        { name: 'tab-storage' }
    ))
