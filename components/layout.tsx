"use client"

import React, { useState } from "react"
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

interface LayoutProps {
  children: React.ReactNode
}

interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  href: string
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Package, label: "Inventory", href: "/inventory" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Calendar, label: "Predictions", href: "/predictions" },
    { icon: Users, label: "Hospitals", href: "/hospitals" },
  ]

  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-0"
        } lg:pl-64`}
      >
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <Sidebar>
            <SidebarHeader className="border-b px-6 py-3">
              <Link href="/" className="flex items-center gap-2">
                <BoxIcon className="h-6 w-6" />
                <span className="font-semibold">MedInventory</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center gap-2">
                        {React.createElement(item.icon, { className: "h-4 w-4" })}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            {/* Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <span className="sr-only">Toggle Sidebar</span>
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
