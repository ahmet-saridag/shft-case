// src/stores/general-store.ts
import { createStore } from 'zustand/vanilla'



export const defaultInitState = {
  userData: [],
  isSignUp: false
}

export const createGeneralStore = (
  initState = defaultInitState,
) => {
  return createStore((set) => ({
    ...initState,
    setUserData: (data:any) => set((state:any) => ({ userData: data})),
    setIsSignUp: (auth:boolean) => set((state:any) => ({ isSignUp: auth})),
  }))
}