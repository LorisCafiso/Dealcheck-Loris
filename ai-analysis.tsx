"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Link,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Clock,
  Star,
  ShoppingCart,
} from "lucide-react"

interface AnalysisResult {
  score: number
  title: string
  currentPrice: number
  originalPrice: number
  discount: number
  category: string
  authenticity: "verified" | "suspicious" | "fake"
  priceHistory: Array<{ date: string; price: number }>
  marketComparison: Array<{ store: string; price: number; availability: boolean }>
  recommendation: "buy" | "wait" | "avoid"
  reasons: string[]
  estimatedSavings: number
}

export function AIAnalysis() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  // Mock analysis function
  const analyzeProduct = async () => {
    if (!url.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock result
    const mockResult: AnalysisResult = {
      score: 87,
      title: "iPhone 15 Pro Max 256GB - Titanio Naturale",
      currentPrice: 1199,
      originalPrice: 1489,
      discount: 19,
      category: "Smartphone",
      authenticity: "verified",
      priceHistory: [
        { date: "2024-01", price: 1489 },
        { date: "2024-02", price: 1450 },
        { date: "2024-03", price: 1399 },
        { date: "2024-04", price: 1299 },
        { date: "2024-05", price: 1199 },
      ],
      marketComparison: [
        { store: "Amazon", price: 1199, availability: true },
        { store: "MediaWorld", price: 1249, availability: true },
        { store: "Unieuro", price: 1299, availability: false },
        { store: "ePRICE", price: 1189, availability: true },
      ],
      recommendation: "buy",
      reasons: [
        "Prezzo 19% sotto il MSRP",
        "Trend di prezzo in discesa",
        "Venditore verificato",
        "Disponibilità limitata",
        "Miglior prezzo degli ultimi 3 mesi",
      ],
      estimatedSavings: 290,
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-secondary"
    if (score >= 60) return "text-primary"
    return "text-destructive"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const getAuthenticityIcon = (authenticity: string) => {
    switch (authenticity) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-secondary" />
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-primary" />
      case "fake":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "buy":
        return "text-secondary"
      case "wait":
        return "text-primary"
      case "avoid":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Analysis Input */}
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading text-xl font-bold mb-2">Analisi AI Avanzata</h2>
          <p className="text-muted-foreground text-sm">Incolla il link del prodotto per un'analisi completa con IA</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="https://esempio.com/prodotto"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button onClick={analyzeProduct} disabled={!url.trim() || isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analizzando...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Analizza Prodotto
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analysis Results */}
      {result && (
        <div className="space-y-4">
          {/* Overall Score */}
          <Card className="p-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.score)}`}>{result.score}/100</div>
              <Badge variant={getScoreBadgeVariant(result.score)} className="mb-4">
                <Star className="mr-1 h-3 w-3" />
                Qualità Deal
              </Badge>
              <Progress value={result.score} className="mb-4" />
              <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl font-bold text-primary">€{result.currentPrice}</span>
                <span className="text-sm text-muted-foreground line-through">€{result.originalPrice}</span>
                <Badge variant="destructive" className="text-xs">
                  -{result.discount}%
                </Badge>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">{getAuthenticityIcon(result.authenticity)}</div>
              <div className="text-xs text-muted-foreground">Autenticità</div>
              <div className="text-sm font-semibold capitalize">{result.authenticity}</div>
            </Card>

            <Card className="p-4 text-center">
              <TrendingDown className="h-4 w-4 mx-auto mb-2 text-secondary" />
              <div className="text-xs text-muted-foreground">Risparmio</div>
              <div className="text-sm font-semibold">€{result.estimatedSavings}</div>
            </Card>

            <Card className="p-4 text-center">
              <Target className={`h-4 w-4 mx-auto mb-2 ${getRecommendationColor(result.recommendation)}`} />
              <div className="text-xs text-muted-foreground">Consiglio</div>
              <div className={`text-sm font-semibold capitalize ${getRecommendationColor(result.recommendation)}`}>
                {result.recommendation === "buy" ? "Compra" : result.recommendation === "wait" ? "Aspetta" : "Evita"}
              </div>
            </Card>
          </div>

          {/* Analysis Reasons */}
          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analisi Dettagliata
            </h4>
            <div className="space-y-2">
              {result.reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Market Comparison */}
          <Card className="p-6">
            <h4 className="font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Confronto Prezzi
            </h4>
            <div className="space-y-3">
              {result.marketComparison.map((store, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{store.store}</div>
                    {!store.availability && (
                      <Badge variant="outline" className="text-xs">
                        Non disponibile
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{store.price}</div>
                    {store.price === result.currentPrice && (
                      <div className="text-xs text-secondary">Miglior prezzo</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent">
              <Clock className="mr-2 h-4 w-4" />
              Monitora
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Vai al prodotto
            </Button>
          </div>
        </div>
      )}

      {/* Recent Analyses */}
      {!result && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Analisi Recenti</h4>
          <div className="space-y-3">
            {[
              { title: "MacBook Air M2", score: 92, price: 1199, savings: 330 },
              { title: "AirPods Pro 2", score: 88, price: 199, savings: 80 },
              { title: 'iPad Pro 11"', score: 75, price: 899, savings: 150 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Score: {item.score}/100 • Risparmio: €{item.savings}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">€{item.price}</div>
                  <Badge variant="outline" className="text-xs">
                    <Star className="mr-1 h-2 w-2" />
                    {item.score}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
