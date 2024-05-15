// src/providers/general-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { createGeneralStore } from '@/store/useGeneralStore'

export const GeneralStoreContext = createContext<StoreApi<any> | null>(
  null,
)

export interface GeneralStoreProviderProps {
  children: ReactNode
}

export const GeneralStoreProvider = ({
  children,
}: GeneralStoreProviderProps) => {
  const storeRef = useRef<StoreApi<any>>()
  if (!storeRef.current) {
    storeRef.current = createGeneralStore()
  }

  return (
    <GeneralStoreContext.Provider value={storeRef.current}>
      {children}
    </GeneralStoreContext.Provider>
  )
}

export const useGeneralStore = <T,>(
  selector: (store: any) => T,
): T => {
  const generalStoreContext = useContext(GeneralStoreContext)

  if (!generalStoreContext) {
    throw new Error(`useGeneralStore must be use within GeneralStoreProvider`)
  }

  return useStore(generalStoreContext, selector)
}