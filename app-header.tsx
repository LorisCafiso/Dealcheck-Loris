"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AppHeaderProps {
  title: string
  showSearch?: boolean
  showNotifications?: boolean
}

export function AppHeader({ title, showSearch = true, showNotifications = true }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl lg:text-2xl font-bold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop search and notifications - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            {showSearch && (
              <Search className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
            )}

            {showNotifications && (
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center border-0"
                >
                  3
                </Badge>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu - hidden on desktop */}
          <Menu className="h-5 w-5 lg:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
