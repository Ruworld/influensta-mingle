
import * as React from "react"
import type { SidebarContext as SidebarContextType } from "./SidebarTypes"

export const SIDEBAR_COOKIE_NAME = "sidebar:state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Create the context with the proper type
const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

// Export the context
export { SidebarContext }
