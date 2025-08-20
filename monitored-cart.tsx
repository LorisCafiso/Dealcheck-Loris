"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ShoppingCart,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Crown,
  AlertCircle,
  ExternalLink,
  Bell,
  Bookmark,
} from "lucide-react"
import {
  getMonitoredProducts,
  getSavedProducts,
  removeMonitoredProduct,
  removeSavedProduct,
  monitorProduct,
  type MonitoredProduct,
  type SavedProduct,
} from "@/lib/local-storage"

const FREE_LIMIT = 10

export function MonitoredCart() {
  const [monitoredProducts, setMonitoredProducts] = useState<MonitoredProduct[]>([])
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([])
  const [newProductUrl, setNewProductUrl] = useState("")
  const [newProductName, setNewProductName] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  useEffect(() => {
    const loadData = () => {
      setMonitoredProducts(getMonitoredProducts())
      setSavedProducts(getSavedProducts())
    }

    loadData()

    // Listen for storage changes to sync across tabs
    const handleStorageChange = () => {
      loadData()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleAddProduct = () => {
    if (monitoredProducts.length >= FREE_LIMIT) {
      return // Show premium upgrade modal
    }

    if (newProductUrl || newProductName) {
      const newProduct = {
        id: Date.now(),
        title: newProductName || "Prodotto da URL",
        currentPrice: Math.floor(Math.random() * 500) + 50, // Mock price for demo
        originalPrice: Math.floor(Math.random() * 700) + 100,
        discount: Math.floor(Math.random() * 50) + 10,
        image: "/placeholder.svg",
        category: "Tech",
        aiQuality: Math.floor(Math.random() * 20) + 80,
        targetPrice: Number.parseInt(targetPrice) || undefined,
      }

      monitorProduct(newProduct, newProduct.targetPrice)
      setMonitoredProducts(getMonitoredProducts())
      setNewProductUrl("")
      setNewProductName("")
      setTargetPrice("")
      setIsAddingProduct(false)
    }
  }

  const handleRemoveMonitoredProduct = (id: number) => {
    removeMonitoredProduct(id)
    setMonitoredProducts(getMonitoredProducts())
  }

  const handleRemoveSavedProduct = (id: number) => {
    removeSavedProduct(id)
    setSavedProducts(getSavedProducts())
  }

  const toggleNotifications = (id: number) => {
    // This would update notification preferences in a real app
    console.log(`Toggle notifications for product ${id}`)
  }

  const getPriceChange = (product: MonitoredProduct) => {
    if (product.priceHistory.length < 2) return 0
    const previousPrice = product.priceHistory[product.priceHistory.length - 2].price
    return product.currentPrice - previousPrice
  }

  const totalProducts = monitoredProducts.length + savedProducts.length

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold">Il tuo carrello monitorabile</h2>
          <p className="text-sm text-muted-foreground">
            {totalProducts}/{FREE_LIMIT} prodotti salvati/monitorati
          </p>
        </div>
        <Button
          onClick={() => setIsAddingProduct(!isAddingProduct)}
          className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi
        </Button>
      </div>

      {/* Add product form */}
      {isAddingProduct && (
        <Card className="p-4 lg:p-6 border-2 border-dashed border-secondary/30">
          <div className="space-y-4">
            <div>
              <Label htmlFor="product-url" className="text-sm font-medium">
                URL del prodotto
              </Label>
              <Input
                id="product-url"
                placeholder="https://esempio.com/prodotto"
                value={newProductUrl}
                onChange={(e) => setNewProductUrl(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="text-center text-sm text-muted-foreground">oppure</div>

            <div>
              <Label htmlFor="product-name" className="text-sm font-medium">
                Nome del prodotto
              </Label>
              <Input
                id="product-name"
                placeholder="iPhone 15 Pro Max"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="target-price" className="text-sm font-medium">
                Prezzo target (€)
              </Label>
              <Input
                id="target-price"
                type="number"
                placeholder="999"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleAddProduct} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Aggiungi al carrello
              </Button>
              <Button variant="outline" onClick={() => setIsAddingProduct(false)} className="bg-transparent">
                Annulla
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Free limit warning */}
      {totalProducts >= FREE_LIMIT - 2 && (
        <Card className="p-4 lg:p-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200">Limite quasi raggiunto</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Hai utilizzato {totalProducts} dei {FREE_LIMIT} slot gratuiti.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent w-full sm:w-auto"
              >
                <Crown className="mr-2 h-4 w-4" />
                Passa a Premium per il carrello illimitato
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-2 border-b border-border">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
          Monitorati ({monitoredProducts.length})
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Salvati ({savedProducts.length})
        </button>
      </div>

      {/* Monitored products list */}
      <div className="space-y-4">
        {monitoredProducts.length === 0 && savedProducts.length === 0 ? (
          <Card className="p-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Nessun prodotto monitorato</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aggiungi i tuoi prodotti preferiti per monitorare i prezzi
            </p>
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi il primo prodotto
            </Button>
          </Card>
        ) : (
          <>
            {/* Monitored Products */}
            {monitoredProducts.map((product) => {
              const priceChange = getPriceChange(product)
              const isTargetReached = product.targetPrice && product.currentPrice <= product.targetPrice

              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4 lg:p-6">
                    {/* Product image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm sm:text-base leading-tight truncate pr-2">
                          {product.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMonitoredProduct(product.id)}
                          className="text-destructive hover:text-destructive p-1 h-auto flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg sm:text-xl">€{product.currentPrice}</span>
                        {priceChange !== 0 && (
                          <div
                            className={`flex items-center text-xs ${
                              priceChange < 0 ? "text-secondary" : "text-destructive"
                            }`}
                          >
                            {priceChange < 0 ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            )}
                            €{Math.abs(priceChange)}
                          </div>
                        )}
                      </div>

                      {/* Target price and status */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {product.targetPrice && (
                          <Badge
                            variant={isTargetReached ? "default" : "outline"}
                            className={`text-xs ${
                              isTargetReached ? "bg-secondary text-secondary-foreground" : "border-muted-foreground"
                            }`}
                          >
                            Target: €{product.targetPrice}
                          </Badge>
                        )}
                        {isTargetReached && (
                          <Badge variant="secondary" className="text-xs">
                            🎯 Target raggiunto!
                          </Badge>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleNotifications(product.id)}
                          className="bg-transparent text-xs sm:text-sm"
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          Notifiche
                        </Button>

                        <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Vai al prodotto
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}

            {savedProducts.map((product) => (
              <Card key={`saved-${product.id}`} className="overflow-hidden border-l-4 border-l-primary/30">
                <div className="flex gap-4 p-4 lg:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-primary flex-shrink-0" />
                        <h3 className="font-semibold text-sm sm:text-base leading-tight truncate">{product.title}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSavedProduct(product.id)}
                        className="text-destructive hover:text-destructive p-1 h-auto flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg sm:text-xl">€{product.currentPrice}</span>
                      <span className="text-sm text-muted-foreground line-through">€{product.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Vai al prodotto
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Premium upgrade CTA */}
      {totalProducts >= FREE_LIMIT && (
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="text-center">
            <Crown className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="font-heading text-xl font-bold mb-2">Passa a DealCheck Premium</h3>
            <p className="text-muted-foreground mb-4">
              Carrello illimitato, notifiche istantanee e comparatore AI avanzato
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Crown className="mr-2 h-4 w-4" />
              Scopri Premium
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
