import { NextRequest, NextResponse } from "next/server"
import { generateWorkout } from "@/lib/ollama"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt é obrigatório" },
        { status: 400 }
      )
    }

    const response = await generateWorkout(prompt)
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Erro ao gerar treino:", error)
    return NextResponse.json(
      { error: "Erro ao gerar treino" },
      { status: 500 }
    )
  }
}
