"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Utensils, Calculator } from "lucide-react"

interface FoodItem {
  id: string
  name: string
  calories: number
}

export function DietTab() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [newFood, setNewFood] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const dailyCalorieGoal = 2000
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0)
  const remainingCalories = dailyCalorieGoal - totalCalories

  const addFoodItem = async () => {
    if (!newFood) return

    setIsCalculating(true)
    try {
      const response = await fetch("/api/calories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodItem: newFood }),
      })

      if (!response.ok) {
        throw new Error("Erro ao calcular calorias")
      }

      const data = await response.json()
      const foodItem: FoodItem = {
        id: Date.now().toString(),
        name: newFood,
        calories: data.calories
      }
      setFoodItems([...foodItems, foodItem])
      setNewFood("")
    } catch (error) {
      console.error("Erro ao calcular calorias:", error)
      alert("Erro ao calcular calorias. Tente novamente.")
    }
    setIsCalculating(false)
  }

  const removeFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  const handleGenerateDiet = async () => {
    if (!aiPrompt) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar dieta")
      }

      const data = await response.json()
      setAiResponse(data.response)
    } catch (error) {
      console.error("Erro ao gerar dieta:", error)
      setAiResponse("Erro ao gerar dieta. Tente novamente.")
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dieta</h2>
        <p className="text-gray-400">Gerencie sua alimentação e calcule calorias</p>
      </div>

      {/* Resumo de Calorias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-500" />
            Resumo Diário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-500">{totalCalories}</p>
              <p className="text-sm text-gray-400">Consumidas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">{dailyCalorieGoal}</p>
              <p className="text-sm text-gray-400">Meta</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${remainingCalories >= 0 ? "text-green-500" : "text-red-500"}`}>
                {remainingCalories}
              </p>
              <p className="text-sm text-gray-400">Restantes</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((totalCalories / dailyCalorieGoal) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gerador de Dieta com IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-purple-500" />
            Gerar Dieta com IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Descreva suas necessidades (ex: Preciso de uma dieta para ganhar massa muscular, 2500 calorias, sem lactose)"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
          />
          <Button onClick={handleGenerateDiet} disabled={isLoading} className="w-full">
            {isLoading ? "Gerando..." : "Gerar Dieta"}
          </Button>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Dieta Sugerida:</h4>
              <pre className="whitespace-pre-wrap text-sm text-gray-300">{aiResponse}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adicionar Alimento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-500" />
            Adicionar Alimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ex: 1 xícara de arroz, 200g de frango"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFoodItem()}
            />
            <Button onClick={addFoodItem} disabled={isCalculating}>
              {isCalculating ? "Calculando..." : <Plus className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-400">A IA calculará automaticamente as calorias do alimento</p>
        </CardContent>
      </Card>

      {/* Lista de Alimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            Alimentos Consumidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {foodItems.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhum alimento adicionado hoje</p>
          ) : (
            <div className="space-y-3">
              {foodItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.calories} calorias</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFoodItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
