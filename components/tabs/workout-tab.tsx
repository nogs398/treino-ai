"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Dumbbell, Activity } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  type: "musculacao" | "corrida"
}

export function WorkoutTab() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 3,
    reps: "",
    type: "musculacao" as "musculacao" | "corrida"
  })
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addExercise = () => {
    if (!newExercise.name) return

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      sets: newExercise.sets,
      reps: newExercise.reps,
      type: newExercise.type
    }

    setExercises([...exercises, exercise])
    setNewExercise({ name: "", sets: 3, reps: "", type: "musculacao" })
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id))
  }

  const handleGenerateWorkout = async () => {
    if (!aiPrompt) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar treino")
      }

      const data = await response.json()
      
      // Tentar parsear como JSON
      try {
        const parsed = JSON.parse(data.response)
        if (parsed.exercises && Array.isArray(parsed.exercises)) {
          // Adicionar exercícios à lista
          const newExercises = parsed.exercises.map((ex: any) => ({
            id: Date.now().toString() + Math.random(),
            name: ex.name,
            sets: ex.sets || 3,
            reps: ex.reps || "12",
            type: ex.type || "musculacao"
          }))
          setExercises([...exercises, ...newExercises])
          setAiResponse(parsed.description || "Treino gerado com sucesso!")
        } else {
          setAiResponse(data.response)
        }
      } catch {
        // Se não for JSON, mostrar como texto
        setAiResponse(data.response)
      }
    } catch (error) {
      console.error("Erro ao gerar treino:", error)
      setAiResponse("Erro ao gerar treino. Tente novamente.")
    }
    setIsLoading(false)
  }

  const muscleExercises = exercises.filter(ex => ex.type === "musculacao")
  const runningExercises = exercises.filter(ex => ex.type === "corrida")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Treinos</h2>
        <p className="text-gray-400">Gerencie seus exercícios de musculação e corrida</p>
      </div>

      {/* Gerador de Treino com IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Gerar Treino com IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Descreva seu objetivo (ex: Quero um treino de peito para iniciantes, 3x por semana)"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
          />
          <Button onClick={handleGenerateWorkout} disabled={isLoading} className="w-full">
            {isLoading ? "Gerando..." : "Gerar Treino"}
          </Button>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
              <h4 className="font-semibold mb-2">Treino Sugerido:</h4>
              <pre className="whitespace-pre-wrap text-sm text-gray-300">{aiResponse}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adicionar Exercício Manual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-500" />
            Adicionar Exercício
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Exercício</label>
              <Input
                placeholder="Ex: Supino, Agachamento, Corrida 5km"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                value={newExercise.type}
                onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value as "musculacao" | "corrida" })}
              >
                <option value="musculacao">Musculação</option>
                <option value="corrida">Corrida</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Séries</label>
              <Input
                type="number"
                placeholder="3"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repetições/Distância</label>
              <Input
                placeholder="Ex: 12, 5km, 30min"
                value={newExercise.reps}
                onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addExercise} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Exercício
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Exercícios de Musculação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-500" />
            Musculação
          </CardTitle>
        </CardHeader>
        <CardContent>
          {muscleExercises.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhum exercício de musculação adicionado</p>
          ) : (
            <div className="space-y-3">
              {muscleExercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-gray-400">{exercise.sets} séries × {exercise.reps}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de Exercícios de Corrida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Corrida
          </CardTitle>
        </CardHeader>
        <CardContent>
          {runningExercises.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Nenhum exercício de corrida adicionado</p>
          ) : (
            <div className="space-y-3">
              {runningExercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-gray-400">{exercise.sets} séries × {exercise.reps}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
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
