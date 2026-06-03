"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dumbbell, Utensils, Calendar, TrendingUp } from "lucide-react"

export function HomeTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Bem-vindo ao Treino App</h2>
        <p className="text-gray-400">Gerencie seus treinos e dieta com inteligência artificial</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Dumbbell className="h-5 w-5 text-blue-500" />
              Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-400">Treinos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="h-5 w-5 text-green-500" />
              Calorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,850</p>
            <p className="text-sm text-gray-400">Calorias hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-purple-500" />
              Sequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-gray-400">Dias consecutivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+15%</p>
            <p className="text-sm text-gray-400">Melhoria este mês</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Como começar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-semibold">Configure seu perfil</h3>
              <p className="text-sm text-gray-400">Defina seus objetivos e preferências de treino</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-semibold">Gere treinos com IA</h3>
              <p className="text-sm text-gray-400">Use o Ollama Cloud para criar treinos personalizados</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-semibold">Gerencie sua dieta</h3>
              <p className="text-sm text-gray-400">Calcule calorias e acompanhe sua alimentação</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-semibold">Acompanhe no calendário</h3>
              <p className="text-sm text-gray-400">Visualize seus treinos e dietas organizados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
