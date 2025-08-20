"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  TrendingDown,
  Star,
  Bookmark,
  Eye,
  ExternalLink,
  Search,
  Filter,
  BookmarkCheck,
  CheckCircle,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AppHeader } from "@/components/app-header"
import { MonitoredCart } from "@/components/monitored-cart"
import { AIAnalysis } from "@/components/ai-analysis"
import { Marketplace } from "@/components/marketplace"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { UserProfile } from "@/components/user-profile"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWAStatus } from "@/components/pwa-status"
import {
  saveProduct,
  monitorProduct,
  isProductSaved,
  isProductMonitored,
  removeSavedProduct,
  removeMonitoredProduct,
} from "@/lib/local-storage"

const mockDeals = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    originalPrice: 1489,
    currentPrice: 1199,
    discount: 19,
    aiQuality: 95,
    image: "/iphone-15-pro-max.png",
    category: "Tech",
    timeLeft: "2 giorni",
    views: 1234,
  },
  {
    id: 2,
    title: "Nike Air Max 270 Sneakers",
    originalPrice: 150,
    currentPrice: 89,
    discount: 41,
    aiQuality: 88,
    image: "/nike-air-max-270-white.png",
    category: "Moda",
    timeLeft: "5 ore",
    views: 856,
  },
  {
    id: 3,
    title: 'MacBook Air M2 13" 256GB',
    originalPrice: 1529,
    currentPrice: 1199,
    discount: 22,
    aiQuality: 92,
    image: "/placeholder-1w2h9.png",
    category: "Tech",
    timeLeft: "1 giorno",
    views: 2341,
  },
  {
    id: 4,
    title: 'Samsung 65" QLED 4K TV',
    originalPrice: 899,
    currentPrice: 649,
    discount: 28,
    aiQuality: 90,
    image: "/samsung-qled-4k-tv-black.png",
    category: "Casa",
    timeLeft: "3 giorni",
    views: 567,
  },
  {
    id: 5,
    title: "AirPods Pro 2ª Gen",
    originalPrice: 279,
    currentPrice: 199,
    discount: 29,
    aiQuality: 94,
    image: "/placeholder-695xf.png",
    category: "Tech",
    timeLeft: "6 ore",
    views: 1789,
  },
]

const mockUser = {
  name: "Mario Rossi",
  email: "mario.rossi@esempio.com",
  avatar: "/generic-user-avatar.png",
  joinDate: "2024-01-15",
  totalSavings: 1250,
  dealsFound: 47,
  itemsMonitored: 12,
  itemsSold: 3,
  rating: 4.8,
  verified: true,
  level: "Deal Hunter Pro",
  levelProgress: 75,
}

function HomeFeed() {
  const [savedProducts, setSavedProducts] = useState<Set<number>>(new Set())
  const [monitoredProducts, setMonitoredProducts] = useState<Set<number>>(new Set())

  useEffect(() => {
    const updateProductStates = () => {
      const saved = new Set<number>()
      const monitored = new Set<number>()

      mockDeals.forEach((deal) => {
        if (isProductSaved(deal.id)) saved.add(deal.id)
        if (isProductMonitored(deal.id)) monitored.add(deal.id)
      })

      setSavedProducts(saved)
      setMonitoredProducts(monitored)
    }

    updateProductStates()
  }, [])

  const handleSaveProduct = (deal: (typeof mockDeals)[0]) => {
    if (savedProducts.has(deal.id)) {
      removeSavedProduct(deal.id)
      setSavedProducts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(deal.id)
        return newSet
      })
    } else {
      saveProduct({
        id: deal.id,
        title: deal.title,
        currentPrice: deal.currentPrice,
        originalPrice: deal.originalPrice,
        discount: deal.discount,
        image: deal.image,
        category: deal.category,
        aiQuality: deal.aiQuality,
      })
      setSavedProducts((prev) => new Set([...prev, deal.id]))
    }
  }

  const handleMonitorProduct = (deal: (typeof mockDeals)[0]) => {
    if (monitoredProducts.has(deal.id)) {
      removeMonitoredProduct(deal.id)
      setMonitoredProducts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(deal.id)
        return newSet
      })
    } else {
      monitorProduct({
        id: deal.id,
        title: deal.title,
        currentPrice: deal.currentPrice,
        originalPrice: deal.originalPrice,
        discount: deal.discount,
        image: deal.image,
        category: deal.category,
        aiQuality: deal.aiQuality,
      })
      setMonitoredProducts((prev) => new Set([...prev, deal.id]))
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="relative overflow-hidden mx-4 lg:mx-8 rounded-3xl p-6 lg:p-12 shadow-2xl gradient-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-6 left-6 w-20 h-20 bg-primary rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-12 right-12 w-12 h-12 bg-secondary rounded-full animate-bounce-gentle delay-1000"></div>
          <div className="absolute bottom-6 left-1/3 w-10 h-10 bg-primary rounded-full animate-bounce-gentle delay-500"></div>
        </div>

        <div className="relative text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-6 py-3 text-base font-bold animate-bounce bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Powered by AI
          </Badge>
          <h1 className="font-sans text-4xl font-black tracking-tight text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DealCheck
          </h1>
          <p className="text-lg text-muted-foreground mb-8 font-medium">I veri sconti in un attimo</p>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="animate-scale-in">
              <div className="font-sans text-3xl font-black text-primary">10K+</div>
              <div className="text-sm text-muted-foreground font-semibold">Offerte</div>
            </div>
            <div className="animate-scale-in delay-100">
              <div className="font-sans text-3xl font-black text-secondary">€2.5M</div>
              <div className="text-sm text-muted-foreground font-semibold">Risparmi</div>
            </div>
            <div className="animate-scale-in delay-200">
              <div className="font-sans text-3xl font-black text-primary">95%</div>
              <div className="text-sm text-muted-foreground font-semibold">Precisione</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-8">
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca prodotti, marchi, categorie..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-base font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 shadow-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-thin pb-2">
          {["Tutti", "Tech", "Moda", "Casa", "Sport", "Bellezza"].map((filter, index) => (
            <Button
              key={filter}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                index === 0
                  ? "bg-primary hover:bg-primary/90 text-white shadow-lg"
                  : "border-border hover:bg-muted/50 hover:border-primary/50"
              }`}
            >
              {filter}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap px-4 py-2 rounded-full border-border hover:bg-muted/50 bg-transparent"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans text-2xl font-black text-foreground">Offerte del momento</h2>
          <Badge
            variant="outline"
            className="text-sm px-4 py-2 border-primary/30 text-primary bg-primary/5 font-bold rounded-full"
          >
            <TrendingDown className="mr-2 h-4 w-4" />
            Live
          </Badge>
        </div>

        <div className="lg:flex lg:gap-8">
          <aside className="hidden lg:block w-64 space-y-6">
            <Card className="p-6 bg-card border-0 rounded-2xl shadow-lg">
              <h3 className="font-sans font-bold text-lg mb-4">Filtri</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground/70 mb-2 block">Categoria</label>
                  <select className="w-full p-3 bg-muted/30 border border-border rounded-xl text-sm">
                    <option>Tutte le categorie</option>
                    <option>Tech</option>
                    <option>Moda</option>
                    <option>Casa</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/70 mb-2 block">Prezzo</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 p-3 bg-muted/30 border border-border rounded-xl text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 p-3 bg-muted/30 border border-border rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/70 mb-2 block">Sconto minimo</label>
                  <input type="range" min="0" max="80" className="w-full" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-0 rounded-2xl shadow-lg">
              <h3 className="font-sans font-bold text-lg mb-4">Trending</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground/70">iPhone 15</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-foreground/70">MacBook Air</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground/70">Nike Air Max</span>
                </div>
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {mockDeals.map((deal, index) => (
                <Card
                  key={deal.id}
                  className="overflow-hidden shadow-lg hover-lift bg-card border-0 rounded-3xl animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] bg-gradient-to-br from-muted/20 to-muted/40">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 sm:object-contain sm:p-2 lg:object-contain lg:p-4"
                    />

                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="destructive"
                        className="text-sm lg:text-base font-black shadow-2xl px-3 py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-destructive to-destructive/80 backdrop-blur-sm border-0"
                      >
                        -{deal.discount}%
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="text-xs lg:text-sm glass-effect text-foreground font-bold px-3 py-1 lg:px-4 lg:py-2 border-0"
                      >
                        {deal.timeLeft}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 glass-effect text-foreground text-xs lg:text-sm px-3 py-2 lg:px-4 lg:py-3 rounded-full border-0">
                      <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="font-semibold">{deal.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Badge
                          variant="outline"
                          className="text-xs lg:text-sm mb-3 border-primary/30 text-primary bg-primary/10 font-bold px-2 py-1 lg:px-3 lg:py-1"
                        >
                          {deal.category}
                        </Badge>
                        <h3 className="font-sans font-black text-lg lg:text-xl leading-tight mb-3 text-card-foreground">
                          {deal.title}
                        </h3>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-sans font-black text-xl lg:text-2xl text-primary">
                            €{deal.currentPrice}
                          </span>
                          <span className="text-sm lg:text-base text-muted-foreground line-through font-medium">
                            €{deal.originalPrice}
                          </span>
                        </div>

                        <Badge
                          variant="outline"
                          className={`text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2 font-bold ${
                            deal.aiQuality >= 90
                              ? "border-secondary/40 text-secondary bg-secondary/10"
                              : "border-muted-foreground/40 text-muted-foreground bg-muted/30"
                          }`}
                        >
                          <Star className="mr-1 lg:mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                          Qualità AI: {deal.aiQuality}/100
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveProduct(deal)}
                        className={`flex-1 border-0 transition-all duration-300 font-semibold rounded-xl lg:rounded-2xl ${
                          savedProducts.has(deal.id)
                            ? "bg-primary/20 text-primary hover:bg-primary/30"
                            : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        {savedProducts.has(deal.id) ? (
                          <BookmarkCheck className="mr-2 h-4 w-4" />
                        ) : (
                          <Bookmark className="mr-2 h-4 w-4" />
                        )}
                        {savedProducts.has(deal.id) ? "Salvato" : "Salva"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleMonitorProduct(deal)}
                        className={`flex-1 transition-all duration-300 font-semibold rounded-xl lg:rounded-2xl shadow-lg border-0 ${
                          monitoredProducts.has(deal.id)
                            ? "bg-secondary hover:bg-secondary/90"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {monitoredProducts.has(deal.id) ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <Eye className="mr-2 h-4 w-4" />
                        )}
                        {monitoredProducts.has(deal.id) ? "Monitorato" : "Monitora"}
                      </Button>
                    </div>

                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-sm lg:text-base font-bold py-3 lg:py-4 transition-all duration-300 rounded-xl lg:rounded-2xl shadow-lg border-0"
                      onClick={() => window.open(`https://example.com/product/${deal.id}`, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 lg:h-5 w-4 lg:w-5" />
                      Compra ora
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="w-full py-4 text-lg font-bold border-0 bg-muted/30 hover:bg-muted/50 transition-all duration-300 rounded-2xl"
              >
                Carica altre offerte
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AISection() {
  return (
    <div className="px-4 py-6">
      <AIAnalysis />
    </div>
  )
}

function MarketplaceSection() {
  return (
    <div className="px-4 py-6">
      <Marketplace />
    </div>
  )
}

function ProfileSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const handleLogin = (email: string, password: string) => {
    console.log("[v0] Login attempt:", { email, password })
    setIsAuthenticated(true)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    console.log("[v0] Register attempt:", { name, email, password })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
  }

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-6">
        {authMode === "login" ? (
          <LoginForm onToggleMode={toggleAuthMode} onLogin={handleLogin} />
        ) : (
          <RegisterForm onToggleMode={toggleAuthMode} onRegister={handleRegister} />
        )}
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <UserProfile user={mockUser} onLogout={handleLogout} />
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== "undefined") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/",
          })
          .then((registration) => {
            console.log("[PWA] Service Worker registered successfully:", registration.scope)

            registration.addEventListener("updatefound", () => {
              console.log("[PWA] Service Worker update found")
            })
          })
          .catch((error) => {
            console.warn("[PWA] Service Worker registration failed:", error)
            if (process.env.NODE_ENV === "development") {
              console.log("[PWA] Service Worker registration failed in development mode - this is normal")
            }
          })
      })
    } else {
      console.log("[PWA] Service Workers not supported in this browser")
    }

    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
    if (tabParam && ["home", "cart", "ai", "marketplace", "profile"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "home":
        return "DealCheck"
      case "cart":
        return "Carrello Monitorato"
      case "ai":
        return "Analisi AI"
      case "marketplace":
        return "Mercato Usato"
      case "profile":
        return "Profilo"
      default:
        return "DealCheck"
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeFeed />
      case "cart":
        return <MonitoredCart />
      case "ai":
        return <AISection />
      case "marketplace":
        return <MarketplaceSection />
      case "profile":
        return <ProfileSection />
      default:
        return <HomeFeed />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <AppHeader
        title={getHeaderTitle()}
        showSearch={activeTab === "home" || activeTab === "marketplace"}
        showNotifications={true}
      />

      <div className="lg:flex">
        <aside className="hidden lg:block w-64 border-r border-border/40 min-h-screen bg-card/30">
          <nav className="p-6 space-y-2">
            {[
              { id: "home", label: "Home", icon: "🏠" },
              { id: "cart", label: "Carrello", icon: "🛒" },
              { id: "ai", label: "AI", icon: "⚡" },
              { id: "marketplace", label: "Usato", icon: "📦" },
              { id: "profile", label: "Profilo", icon: "👤" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-primary text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 pt-2 lg:pt-6">{renderContent()}</main>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <PWAInstallPrompt />
      <PWAStatus />
    </div>
  )
}
