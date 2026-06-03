import { NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json()

    const useOpenAI = process.env.USE_OPENAI === 'true'

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

    if (useOpenAI) {
      // Usar OpenAI
      const apiKey = process.env.OPENAI_API_KEY
      
      if (!apiKey) {
        console.error("OPENAI_API_KEY não está configurada")
        return NextResponse.json(
          { error: "API key da OpenAI não configurada. Verifique as variáveis de ambiente." },
          { status: 500 }
        )
      }

      console.log("Usando OpenAI API...")

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Você é um especialista em treinos e nutrição personalizados."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 1000,
        }),
      })

      console.log("Status da resposta OpenAI:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro na resposta da OpenAI:", errorText)
        throw new Error(`Erro ao chamar OpenAI: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("Resposta recebida com sucesso")
      return NextResponse.json({ response: data.choices[0].message.content })
    } else {
      // Usar Ollama Cloud
      const apiKey = process.env.OLLAMA_CLOUD_API_KEY
      const apiUrl = process.env.OLLAMA_CLOUD_URL || "https://api.ollama.cloud"

      // Verificar se API key está configurada
      if (!apiKey) {
        console.error("OLLAMA_CLOUD_API_KEY não está configurada")
        return NextResponse.json(
          { error: "API key do Ollama Cloud não configurada. Configure USE_OPENAI=true para usar OpenAI ou verifique OLLAMA_CLOUD_API_KEY." },
          { status: 500 }
        )
      }

      console.log("Tentando conectar ao Ollama Cloud:", apiUrl)

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

      console.log("Status da resposta:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro na resposta do Ollama Cloud:", errorText)
        throw new Error(`Erro ao chamar Ollama Cloud: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("Resposta recebida com sucesso")

      return NextResponse.json({ response: data.response })
    }
  } catch (error) {
    console.error("Erro no chat:", error)
    return NextResponse.json(
      { error: `Erro ao processar mensagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
      { status: 500 }
    )
  }
}
