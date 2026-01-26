"use client"
import { createContext, useContext } from "react"

// Import all stores here
import { userStore } from "./userStore"
import { shopStore } from "./shopStore"
import { planStore } from "./planStore"
// Combine stores in one object
const store = {
  userStore,
  shopStore, 
  planStore,
}

// Create React Context
const StoreContext = createContext(store)

// Provider component
export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

// Hook to use stores anywhere
export const useStore = () => useContext(StoreContext)
