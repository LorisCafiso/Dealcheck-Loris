"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Settings,
  Heart,
  Eye,
  Package,
  TrendingDown,
  Star,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Edit,
} from "lucide-react"

interface UserData {
  name: string
  email: string
  avatar?: string
  joinDate: string
  totalSavings: number
  dealsFound: number
  itemsMonitored: number
  itemsSold: number
  rating: number
  verified: boolean
  level: string
  levelProgress: number
}

interface UserProfileProps {
  user: UserData
  onLogout: () => void
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  const [activeSection, setActiveSection] = useState<"overview" | "settings" | "activity">("overview")

  const menuItems = [
    { id: "overview", label: "Panoramica", icon: User },
    { id: "settings", label: "Impostazioni", icon: Settings },
    { id: "activity", label: "Attività", icon: Eye },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-heading text-xl font-bold">{user.name}</h2>
              {user.verified && <Shield className="h-4 w-4 text-secondary" />}
            </div>
            <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Star className="mr-1 h-3 w-3" />
                {user.level}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{user.rating}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Modifica
          </Button>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso livello</span>
            <span className="font-medium">{user.levelProgress}%</span>
          </div>
          <Progress value={user.levelProgress} className="h-2" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <TrendingDown className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <div className="font-heading text-2xl font-bold text-secondary">€{user.totalSavings}</div>
          <div className="text-xs text-muted-foreground">Risparmi totali</div>
        </Card>

        <Card className="p-4 text-center">
          <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
          <div className="font-heading text-2xl font-bold text-primary">{user.dealsFound}</div>
          <div className="text-xs text-muted-foreground">Deal trovati</div>
        </Card>

        <Card className="p-4 text-center">
          <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
          <div className="font-heading text-2xl font-bold text-primary">{user.itemsMonitored}</div>
          <div className="text-xs text-muted-foreground">Prodotti monitorati</div>
        </Card>

        <Card className="p-4 text-center">
          <Package className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <div className="font-heading text-2xl font-bold text-secondary">{user.itemsSold}</div>
          <div className="text-xs text-muted-foreground">Prodotti venduti</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Attività recente</h3>
        <div className="space-y-3">
          {[
            { action: "Deal salvato", item: "iPhone 15 Pro Max", time: "2 ore fa", savings: 290 },
            { action: "Prodotto venduto", item: "MacBook Air M2", time: "1 giorno fa", earnings: 950 },
            { action: "Prezzo diminuito", item: "AirPods Pro 2", time: "2 giorni fa", savings: 30 },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{activity.action}</div>
                <div className="text-xs text-muted-foreground">
                  {activity.item} • {activity.time}
                </div>
              </div>
              <div className="text-right">
                {activity.savings && <div className="text-sm font-semibold text-secondary">-€{activity.savings}</div>}
                {activity.earnings && <div className="text-sm font-semibold text-primary">+€{activity.earnings}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Preferenze account</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notifiche push</div>
              <div className="text-sm text-muted-foreground">Ricevi avvisi per nuovi deal</div>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email marketing</div>
              <div className="text-sm text-muted-foreground">Newsletter settimanale</div>
            </div>
            <input type="checkbox" className="rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Profilo pubblico</div>
              <div className="text-sm text-muted-foreground">Mostra le tue recensioni</div>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Sicurezza</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Shield className="mr-2 h-4 w-4" />
            Cambia password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Bell className="mr-2 h-4 w-4" />
            Gestisci notifiche
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <CreditCard className="mr-2 h-4 w-4" />
            Metodi di pagamento
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4 text-destructive">Zona pericolosa</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent text-destructive border-destructive">
            Elimina account
          </Button>
        </div>
      </Card>
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">I tuoi deal salvati</h3>
        <div className="space-y-3">
          {[
            { title: "iPhone 15 Pro Max", price: 1199, originalPrice: 1489, saved: true },
            { title: "MacBook Air M2", price: 1199, originalPrice: 1529, saved: true },
            { title: "AirPods Pro 2", price: 199, originalPrice: 279, saved: false },
          ].map((deal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{deal.title}</div>
                <div className="text-xs text-muted-foreground">
                  €{deal.price} • Era €{deal.originalPrice}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Heart className={`h-4 w-4 ${deal.saved ? "fill-current text-red-500" : ""}`} />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Prodotti in vendita</h3>
        <div className="space-y-3">
          {[
            { title: 'iPad Pro 11"', price: 650, views: 45, status: "Attivo" },
            { title: "Apple Watch Series 9", price: 320, views: 23, status: "Venduto" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  €{item.price} • {item.views} visualizzazioni
                </div>
              </div>
              <Badge variant={item.status === "Attivo" ? "default" : "secondary"} className="text-xs">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(item.id as any)}
              className="flex-1"
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </div>

      {/* Content */}
      {activeSection === "overview" && renderOverview()}
      {activeSection === "settings" && renderSettings()}
      {activeSection === "activity" && renderActivity()}

      {/* Logout Button */}
      <Card className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent text-destructive border-destructive"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Esci dall'account
        </Button>
      </Card>
    </div>
  )
}
