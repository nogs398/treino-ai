"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Target, Calendar, Activity } from "lucide-react"

interface UserProfile {
  age: number
  weight: number
  height: number
  goal: string
  workoutFrequency: number
  runningFrequency: number
  experienceLevel: "beginner" | "intermediate" | "advanced"
  limitations: string
}

export function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile>({
    age: 0,
    weight: 0,
    height: 0,
    goal: "",
    workoutFrequency: 3,
    runningFrequency: 0,
    experienceLevel: "beginner",
    limitations: ""
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Aqui você salvaria no Supabase
    localStorage.setItem("userProfile", JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLoad = () => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Pré-Avaliação</h2>
        <p className="text-gray-400">Configure seu perfil para treinos personalizados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Idade</label>
              <Input
                type="number"
                placeholder="25"
                value={profile.age || ""}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Peso (kg)</label>
              <Input
                type="number"
                placeholder="75"
                value={profile.weight || ""}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Altura (cm)</label>
              <Input
                type="number"
                placeholder="175"
                value={profile.height || ""}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Objetivos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Seu Objetivo</label>
            <select
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
            >
              <option value="">Selecione seu objetivo</option>
              <option value="perder_peso">Perder Peso</option>
              <option value="ganhar_massa">Ganhar Massa Muscular</option>
              <option value="manter">Manter Peso</option>
              <option value="melhorar_resistencia">Melhorar Resistência</option>
              <option value="forca">Ganhar Força</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nível de Experiência</label>
            <select
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              value={profile.experienceLevel}
              onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value as "beginner" | "intermediate" | "advanced" })}
            >
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Frequência de Treino
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dias de Musculação por Semana</label>
              <Input
                type="number"
                min="0"
                max="7"
                placeholder="3"
                value={profile.workoutFrequency}
                onChange={(e) => setProfile({ ...profile, workoutFrequency: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dias de Corrida por Semana</label>
              <Input
                type="number"
                min="0"
                max="7"
                placeholder="2"
                value={profile.runningFrequency}
                onChange={(e) => setProfile({ ...profile, runningFrequency: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Limitações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Lesões ou Limitações (opcional)</label>
            <Textarea
              placeholder="Ex: Lesão no joelho, dor lombar, etc."
              value={profile.limitations}
              onChange={(e) => setProfile({ ...profile, limitations: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex-1">
          {saved ? "Salvo!" : "Salvar Perfil"}
        </Button>
        <Button onClick={handleLoad} variant="outline" className="flex-1">
          Carregar Perfil
        </Button>
      </div>
    </div>
  )
}
