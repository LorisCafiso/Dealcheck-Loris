export interface SavedProduct {
  id: number
  title: string
  currentPrice: number
  originalPrice: number
  discount: number
  image: string
  category: string
  aiQuality: number
  savedAt: string
}

export interface MonitoredProduct extends SavedProduct {
  targetPrice?: number
  monitoredAt: string
  priceHistory: Array<{ price: number; date: string }>
}

export const localStorageKeys = {
  SAVED_PRODUCTS: "dealcheck_saved_products",
  MONITORED_PRODUCTS: "dealcheck_monitored_products",
  USER_PREFERENCES: "dealcheck_user_preferences",
}

export const saveProduct = (product: Omit<SavedProduct, "savedAt">): void => {
  try {
    const saved = getSavedProducts()
    const newProduct: SavedProduct = {
      ...product,
      savedAt: new Date().toISOString(),
    }

    // Check if already saved
    if (!saved.find((p) => p.id === product.id)) {
      saved.push(newProduct)
      localStorage.setItem(localStorageKeys.SAVED_PRODUCTS, JSON.stringify(saved))
    }
  } catch (error) {
    console.error("Error saving product:", error)
  }
}

export const getSavedProducts = (): SavedProduct[] => {
  try {
    const saved = localStorage.getItem(localStorageKeys.SAVED_PRODUCTS)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error("Error getting saved products:", error)
    return []
  }
}

export const removeSavedProduct = (productId: number): void => {
  try {
    const saved = getSavedProducts().filter((p) => p.id !== productId)
    localStorage.setItem(localStorageKeys.SAVED_PRODUCTS, JSON.stringify(saved))
  } catch (error) {
    console.error("Error removing saved product:", error)
  }
}

export const monitorProduct = (
  product: Omit<MonitoredProduct, "monitoredAt" | "priceHistory">,
  targetPrice?: number,
): void => {
  try {
    const monitored = getMonitoredProducts()
    const newProduct: MonitoredProduct = {
      ...product,
      targetPrice,
      monitoredAt: new Date().toISOString(),
      priceHistory: [{ price: product.currentPrice, date: new Date().toISOString() }],
    }

    // Check if already monitored
    if (!monitored.find((p) => p.id === product.id)) {
      monitored.push(newProduct)
      localStorage.setItem(localStorageKeys.MONITORED_PRODUCTS, JSON.stringify(monitored))
    }
  } catch (error) {
    console.error("Error monitoring product:", error)
  }
}

export const getMonitoredProducts = (): MonitoredProduct[] => {
  try {
    const monitored = localStorage.getItem(localStorageKeys.MONITORED_PRODUCTS)
    return monitored ? JSON.parse(monitored) : []
  } catch (error) {
    console.error("Error getting monitored products:", error)
    return []
  }
}

export const removeMonitoredProduct = (productId: number): void => {
  try {
    const monitored = getMonitoredProducts().filter((p) => p.id !== productId)
    localStorage.setItem(localStorageKeys.MONITORED_PRODUCTS, JSON.stringify(monitored))
  } catch (error) {
    console.error("Error removing monitored product:", error)
  }
}

export const isProductSaved = (productId: number): boolean => {
  return getSavedProducts().some((p) => p.id === productId)
}

export const isProductMonitored = (productId: number): boolean => {
  return getMonitoredProducts().some((p) => p.id === productId)
}
