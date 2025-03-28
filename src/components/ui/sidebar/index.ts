
export * from "./Sidebar"
// Re-export everything *except* SidebarContext from './SidebarContext' 
// to avoid duplicate exports
export { 
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE, 
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
  useSidebar,
  // Explicitly re-export SidebarContext to resolve ambiguity
  SidebarContext
} from "./SidebarContext"
export * from "./SidebarInput"
export * from "./SidebarInset"
export * from "./SidebarMenu"
export * from "./SidebarProvider"
export * from "./SidebarRail"
export * from "./SidebarSections"
export * from "./SidebarTrigger"
// Export types separately to avoid conflicts
export type * from "./SidebarTypes"
