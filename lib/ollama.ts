interface OllamaResponse {
  response: string;
}

export async function generateWorkout(prompt: string): Promise<string> {
  const apiKey = process.env.OLLAMA_CLOUD_API_KEY;
  const apiUrl = process.env.OLLAMA_CLOUD_URL || 'https://api.ollama.cloud';

  try {
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Você é um especialista em treinos. ${prompt}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar treino');
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erro ao chamar Ollama Cloud:', error);
    throw error;
  }
}

export async function generateDiet(prompt: string): Promise<string> {
  const apiKey = process.env.OLLAMA_CLOUD_API_KEY;
  const apiUrl = process.env.OLLAMA_CLOUD_URL || 'https://api.ollama.cloud';

  try {
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Você é um nutricionista especialista. ${prompt}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar dieta');
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erro ao chamar Ollama Cloud:', error);
    throw error;
  }
}

export async function calculateCalories(foodItem: string): Promise<number> {
  const apiKey = process.env.OLLAMA_CLOUD_API_KEY;
  const apiUrl = process.env.OLLAMA_CLOUD_URL || 'https://api.ollama.cloud';

  try {
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Quantas calorias tem "${foodItem}"? Responda apenas com o número de calorias, sem texto adicional.`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao calcular calorias');
    }

    const data: OllamaResponse = await response.json();
    const calories = parseInt(data.response.replace(/\D/g, ''));
    return isNaN(calories) ? 0 : calories;
  } catch (error) {
    console.error('Erro ao calcular calorias:', error);
    throw error;
  }
}
