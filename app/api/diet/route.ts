import { NextRequest, NextResponse } from "next/server"
import { generateDiet } from "@/lib/ollama"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt é obrigatório" },
        { status: 400 }
      )
    }

    const response = await generateDiet(prompt)
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Erro ao gerar dieta:", error)
    return NextResponse.json(
      { error: "Erro ao gerar dieta" },
      { status: 500 }
    )
  }
}
