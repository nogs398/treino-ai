interface OllamaResponse {
  response: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Função para usar OpenAI
async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY não configurada');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em treinos e nutrição personalizados.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data: OpenAIResponse = await response.json();
  return data.choices[0].message.content;
}

// Função para usar Groq (gratuito)
async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY não configurada');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em treinos e nutrição personalizados.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data: GroqResponse = await response.json();
  return data.choices[0].message.content;
}

export async function generateWorkout(prompt: string): Promise<string> {
  const useGroq = process.env.USE_GROQ === 'true';
  const useOpenAI = process.env.USE_OPENAI === 'true';
  
  if (useGroq) {
    return callGroq(`Você é um especialista em treinos. ${prompt}`);
  }
  
  if (useOpenAI) {
    return callOpenAI(`Você é um especialista em treinos. ${prompt}`);
  }

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
  const useGroq = process.env.USE_GROQ === 'true';
  const useOpenAI = process.env.USE_OPENAI === 'true';
  
  if (useGroq) {
    return callGroq(`Você é um nutricionista especialista. ${prompt}`);
  }
  
  if (useOpenAI) {
    return callOpenAI(`Você é um nutricionista especialista. ${prompt}`);
  }

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
  const useGroq = process.env.USE_GROQ === 'true';
  const useOpenAI = process.env.USE_OPENAI === 'true';
  
  if (useGroq) {
    const response = await callGroq(`Quantas calorias tem "${foodItem}"? Responda apenas com o número de calorias, sem texto adicional.`);
    const calories = parseInt(response.replace(/\D/g, ''));
    return isNaN(calories) ? 0 : calories;
  }
  
  if (useOpenAI) {
    const response = await callOpenAI(`Quantas calorias tem "${foodItem}"? Responda apenas com o número de calorias, sem texto adicional.`);
    const calories = parseInt(response.replace(/\D/g, ''));
    return isNaN(calories) ? 0 : calories;
  }

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
