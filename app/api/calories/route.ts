import { NextRequest, NextResponse } from "next/server"
import { calculateCalories } from "@/lib/ollama"

export async function POST(request: NextRequest) {
  try {
    const { foodItem } = await request.json()

    if (!foodItem) {
      return NextResponse.json(
        { error: "foodItem é obrigatório" },
        { status: 400 }
      )
    }

    const calories = await calculateCalories(foodItem)
    return NextResponse.json({ calories })
  } catch (error) {
    console.error("Erro ao calcular calorias:", error)
    return NextResponse.json(
      { error: "Erro ao calcular calorias" },
      { status: 500 }
    )
  }
}
