"use client"

import { useState } from "react"
import { Dumbbell, Utensils, Calendar, Home, User, MessageSquare } from "lucide-react"
import { Button } from "./ui/button"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "home", label: "Início", icon: Home },
    { id: "profile", label: "Perfil", icon: User },
    { id: "workout", label: "Treinos", icon: Dumbbell },
    { id: "diet", label: "Dieta", icon: Utensils },
    { id: "chat", label: "Chat IA", icon: MessageSquare },
    { id: "calendar", label: "Calendário", icon: Calendar },
  ]

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-white">Treino App</h1>
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
