"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, Chrome, Apple, Check } from "lucide-react"

interface RegisterFormProps {
  onToggleMode: () => void
  onRegister: (name: string, email: string, password: string) => void
}

export function RegisterForm({ onToggleMode, onRegister }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword || !acceptTerms) return
    if (password !== confirmPassword) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onRegister(name, email, password)
    setIsLoading(false)
  }

  const passwordsMatch = password === confirmPassword || confirmPassword === ""

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold mb-2">Inizia a risparmiare</h2>
        <p className="text-muted-foreground text-sm">Crea il tuo account DealCheck gratuito</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Mario Rossi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="mario@esempio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {password && (
            <div className="text-xs text-muted-foreground">Minimo 8 caratteri, almeno una maiuscola e un numero</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Conferma password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-10 pr-10 ${!passwordsMatch ? "border-destructive" : ""}`}
              required
            />
            {confirmPassword && passwordsMatch && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
            )}
          </div>
          {!passwordsMatch && confirmPassword && (
            <div className="text-xs text-destructive">Le password non corrispondono</div>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="rounded mt-1"
            required
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
            Accetto i{" "}
            <Button variant="link" className="p-0 h-auto text-primary">
              Termini di Servizio
            </Button>{" "}
            e l'{" "}
            <Button variant="link" className="p-0 h-auto text-primary">
              Informativa sulla Privacy
            </Button>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !passwordsMatch || !acceptTerms}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creazione account...
            </>
          ) : (
            "Crea account"
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Oppure registrati con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" className="bg-transparent">
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Apple className="mr-2 h-4 w-4" />
            Apple
          </Button>
        </div>
      </div>

      <div className="text-center mt-6">
        <span className="text-sm text-muted-foreground">Hai già un account? </span>
        <Button variant="link" className="p-0 h-auto text-primary" onClick={onToggleMode}>
          Accedi
        </Button>
      </div>
    </Card>
  )
}
