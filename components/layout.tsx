"use client"

import React, { useState, useCallback } from "react"
import { Bell, Box as BoxIcon, Calendar, Home, Package, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  href: string
  description?: string
}

interface LayoutProps {
  children: React.ReactNode
}

const MENU_ITEMS: MenuItem[] = [
  { 
    icon: Home, 
    label: "Dashboard", 
    href: "/",
    description: "Overview of key metrics and activities"
  },
  { 
    icon: Package, 
    label: "Inventory", 
    href: "/inventory",
    description: "Manage medical supplies and equipment"
  },
  { 
    icon: ShoppingCart, 
    label: "Orders", 
    href: "/orders",
    description: "Track and manage purchase orders"
  },
  { 
    icon: Calendar, 
    label: "Predictions", 
    href: "/predictions",
    description: "Inventory forecasting and analytics"
  },
  { 
    icon: Users, 
    label: "Hospitals", 
    href: "/hospitals",
    description: "Partner hospital management"
  },
]

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className="lg:hidden"
    aria-label="Toggle Sidebar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  </Button>
)

const SidebarNav = ({ isOpen }: { isOpen: boolean }) => (
  <aside
    className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0"
    )}
  >
    <Sidebar>
      <SidebarHeader className="border-b px-14 py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <BoxIcon className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="font-semibold text-foreground">MedInventory</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <nav aria-label="Main Navigation">
          <SidebarMenu>
            {MENU_ITEMS.map(({ icon: Icon, label, href, description }) => (
              <SidebarMenuItem key={href} className="mb-1">
                <SidebarMenuButton asChild>
                  <Link 
                    href={href} 
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                    aria-label={description}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </SidebarContent>
    </Sidebar>
  </aside>
)

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), [])

  return (
    <SidebarProvider>
      <div className={cn(
        "flex min-h-screen transition-all duration-300",
        isSidebarOpen ? "pl-64" : "pl-0",
        "lg:pl-64"
      )}>
        <SidebarNav isOpen={isSidebarOpen} />
        
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-4">
            <MenuButton onClick={toggleSidebar} />
            
            <div className="ml-auto flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="View notifications"
                className={cn(
                  "hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}