import { NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json()

    const apiKey = process.env.OLLAMA_CLOUD_API_KEY
    const apiUrl = process.env.OLLAMA_CLOUD_URL || "https://api.ollama.cloud"

    // Construir o prompt com contexto e histórico
    let prompt = `Você é um especialista em treinos e nutrição personalizados.\n\n`
    
    if (context) {
      prompt += `${context}\n\n`
    }

    if (history && history.length > 0) {
      prompt += `Histórico da conversa:\n`
      history.forEach((msg: ChatMessage) => {
        prompt += `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}\n`
      })
      prompt += `\n`
    }

    prompt += `Pergunta atual: ${message}\n\nResponda de forma útil e personalizada com base no perfil do usuário.`

    const response = await fetch(`${apiUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error("Erro ao chamar Ollama Cloud")
    }

    const data = await response.json()

    return NextResponse.json({ response: data.response })
  } catch (error) {
    console.error("Erro no chat:", error)
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    )
  }
}
