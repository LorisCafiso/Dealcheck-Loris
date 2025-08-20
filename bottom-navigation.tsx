"use client"
import { Home, ShoppingCart, Package, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "cart",
    label: "Carrello",
    icon: ShoppingCart,
  },
  {
    id: "ai",
    label: "AI",
    icon: Zap,
  },
  {
    id: "marketplace",
    label: "Usato",
    icon: Package,
  },
  {
    id: "profile",
    label: "Profilo",
    icon: User,
  },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-border/50 lg:hidden">
      <div className="flex items-center justify-around px-2 py-3">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 transition-all duration-200 min-w-0 flex-1",
                isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1 transition-colors", isActive && "text-primary")} />
              <span
                className={cn(
                  "text-xs font-medium truncate transition-colors",
                  isActive ? "text-primary" : "text-foreground/70",
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
