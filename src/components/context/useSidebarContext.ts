import { createContext, useContext } from "react"

type SidebarContextType = {
    isLargeOpen: boolean
    isSmallOpen: boolean
    toggle: () => void
    close: () => void
  }
  
  export const SidebarContext = createContext<SidebarContextType | null>(null)
  
  export function useSidebarContext() {
    const value = useContext(SidebarContext)
    if (value == null) throw Error("Cannot use outside of SidebarProvider")
  
    return value
  }