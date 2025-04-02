
// Export components
export * from "./Sidebar"
export * from "./SidebarMenu"
export * from "./SidebarInput"
export * from "./SidebarInset"
export * from "./SidebarProvider"
export * from "./SidebarRail"
export * from "./SidebarSections"
export * from "./SidebarTrigger"

// Export context and utilities from SidebarContext separately 
export { 
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
  useSidebar 
} from "./SidebarContext"

// Export the SidebarContext separately to avoid naming conflicts
export { SidebarContext } from "./SidebarContext" 

// Export types
export type { 
  SidebarContext as SidebarContextType,
  SidebarProviderProps,
  SidebarProps,
  SidebarMenuButtonProps,
  SidebarMenuActionProps, 
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps
} from "./SidebarTypes"
