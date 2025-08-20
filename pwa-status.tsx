"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check if installed as PWA
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline && !isInstalled) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      {!isOnline && (
        <Badge variant="destructive" className="text-xs shadow-lg">
          <WifiOff className="mr-1 h-3 w-3" />
          Offline
        </Badge>
      )}

      {isInstalled && isOnline && (
        <Badge variant="secondary" className="text-xs shadow-lg">
          <Wifi className="mr-1 h-3 w-3" />
          PWA
        </Badge>
      )}
    </div>
  )
}
