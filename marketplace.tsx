"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  Shield,
  Clock,
  Package,
  Smartphone,
  Laptop,
  Camera,
  Headphones,
  Watch,
  Car,
} from "lucide-react"

interface MarketplaceItem {
  id: number
  title: string
  price: number
  originalPrice?: number
  condition: "come-nuovo" | "ottimo" | "buono" | "discreto"
  category: string
  location: string
  timeAgo: string
  seller: {
    name: string
    rating: number
    verified: boolean
    avatar?: string
  }
  images: string[]
  description: string
  views: number
  likes: number
  isLiked: boolean
}

const categories = [
  { id: "all", name: "Tutti", icon: Package },
  { id: "tech", name: "Tech", icon: Smartphone },
  { id: "computer", name: "Computer", icon: Laptop },
  { id: "foto", name: "Foto", icon: Camera },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "orologi", name: "Orologi", icon: Watch },
  { id: "auto", name: "Auto", icon: Car },
]

const mockItems: MarketplaceItem[] = [
  {
    id: 1,
    title: "iPhone 14 Pro 128GB Viola",
    price: 850,
    originalPrice: 1179,
    condition: "ottimo",
    category: "tech",
    location: "Milano, MI",
    timeAgo: "2 ore fa",
    seller: {
      name: "Marco R.",
      rating: 4.8,
      verified: true,
      avatar: "/generic-user-avatar.png",
    },
    images: ["/placeholder-lv8ka.png"],
    description: "iPhone 14 Pro in ottime condizioni, sempre usato con custodia e pellicola. Batteria al 95%.",
    views: 234,
    likes: 12,
    isLiked: false,
  },
  {
    id: 2,
    title: 'MacBook Air M2 13" 256GB',
    price: 950,
    originalPrice: 1529,
    condition: "come-nuovo",
    category: "computer",
    location: "Roma, RM",
    timeAgo: "5 ore fa",
    seller: {
      name: "Sofia M.",
      rating: 4.9,
      verified: true,
      avatar: "/user-avatar-2.png",
    },
    images: ["/macbook-air-m2.png"],
    description: "MacBook Air M2 praticamente nuovo, usato solo per università. Include caricatore originale.",
    views: 456,
    likes: 28,
    isLiked: true,
  },
  {
    id: 3,
    title: "AirPods Pro 2ª Gen",
    price: 180,
    originalPrice: 279,
    condition: "ottimo",
    category: "audio",
    location: "Torino, TO",
    timeAgo: "1 giorno fa",
    seller: {
      name: "Luca B.",
      rating: 4.6,
      verified: false,
      avatar: "/user-avatar-3.png",
    },
    images: ["/wireless-earbuds.png"],
    description: "AirPods Pro 2ª generazione in ottime condizioni. Cuscinetti di ricambio inclusi.",
    views: 189,
    likes: 15,
    isLiked: false,
  },
  {
    id: 4,
    title: "Canon EOS R6 Mark II",
    price: 1800,
    originalPrice: 2899,
    condition: "buono",
    category: "foto",
    location: "Napoli, NA",
    timeAgo: "2 giorni fa",
    seller: {
      name: "Andrea F.",
      rating: 4.7,
      verified: true,
      avatar: "/user-avatar-4.png",
    },
    images: ["/placeholder-dj5wd.png"],
    description: "Fotocamera professionale in buone condizioni. Scatti: 15.000. Include obiettivo 24-105mm.",
    views: 567,
    likes: 34,
    isLiked: false,
  },
]

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState(mockItems)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "come-nuovo":
        return "text-secondary"
      case "ottimo":
        return "text-primary"
      case "buono":
        return "text-orange-500"
      case "discreto":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "come-nuovo":
        return "default"
      case "ottimo":
        return "secondary"
      case "buono":
        return "outline"
      case "discreto":
        return "outline"
      default:
        return "outline"
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleLike = (itemId: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotti usati..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Add Listing Button */}
        <Button className="w-full bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2 h-4 w-4" />
          Vendi un prodotto
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex-shrink-0 bg-transparent"
            >
              <Icon className="mr-1 h-3 w-3" />
              {category.name}
            </Button>
          )
        })}
      </div>

      {/* Stats */}
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-heading text-lg font-bold text-primary">2.5K+</div>
            <div className="text-xs text-muted-foreground">Prodotti attivi</div>
          </div>
          <div>
            <div className="font-heading text-lg font-bold text-secondary">€850K</div>
            <div className="text-xs text-muted-foreground">Valore scambiato</div>
          </div>
          <div>
            <div className="font-heading text-lg font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground">Transazioni sicure</div>
          </div>
        </div>
      </Card>

      {/* Items Grid */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-square bg-muted/50">
              <img src={item.images[0] || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />

              {/* Condition Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant={getConditionBadge(item.condition)} className="text-xs">
                  {item.condition}
                </Badge>
              </div>

              {/* Verified Badge */}
              {item.seller.verified && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs bg-secondary/90 text-white">
                    <Shield className="mr-1 h-2 w-2" />
                    Verificato
                  </Badge>
                </div>
              )}

              {/* Views and Time */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="flex items-center gap-1 text-white text-xs bg-black/70 px-2 py-1 rounded">
                  <Clock className="h-2 w-2" />
                  {item.timeAgo}
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Title and Price */}
              <div className="mb-3">
                <h3 className="font-semibold text-base leading-tight mb-2">{item.title}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-xl text-primary">€{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">€{item.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{item.seller.name}</span>
                      {item.seller.verified && <Shield className="h-3 w-3 text-secondary" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{item.seller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contatta
                </Button>
                <Button variant="ghost" size="sm" className="px-3" onClick={() => toggleLike(item.id)}>
                  <Heart className={`h-4 w-4 ${item.isLiked ? "fill-current text-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full bg-transparent">
          Carica altri prodotti
        </Button>
      </div>

      {/* Safety Notice */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">Acquisti Sicuri</h4>
            <p className="text-xs text-muted-foreground">
              Tutti i venditori verificati. Pagamenti protetti. Garanzia di rimborso entro 7 giorni.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
