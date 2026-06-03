# Treino App

Aplicativo para gestão de treinos e dieta com inteligência artificial, hospedado no Vercel e usando Supabase como banco de dados.

## Funcionalidades

- **Treinos**: Gerencie exercícios de musculação e corrida
- **Dieta**: Calcule calorias e gerencie sua alimentação diária
- **IA Integration**: Use Ollama Cloud para gerar treinos e dietas personalizados
- **Calendário**: Visualize seus treinos e dietas organizados por data

## Tecnologias

- Next.js 14 com App Router
- TypeScript
- TailwindCSS
- Supabase (banco de dados)
- Ollama Cloud (IA)
- Lucide React (ícones)
- date-fns (manipulação de datas)

## Configuração

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd treino
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em Settings > Database
3. Execute o SQL do arquivo `supabase/schema.sql` no SQL Editor
4. Copie a URL e a anon key do seu projeto

### 4. Configure o Ollama Cloud

1. Cadastre-se em [Ollama Cloud](https://ollama.cloud)
2. Obtenha sua API key

### 5. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_supabase
OLLAMA_CLOUD_API_KEY=sua_api_key_ollama
OLLAMA_CLOUD_URL=https://api.ollama.cloud
```

### 6. Execute o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Deploy no Vercel

### 1. Crie uma conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub

### 2. Conecte seu repositório

1. Clique em "Add New Project"
2. Importe seu repositório do GitHub
3. Configure as variáveis de ambiente nas configurações do projeto

### 3. Deploy

1. Clique em "Deploy"
2. Aguarde o processo de deploy
3. Seu site estará disponível em um URL do Vercel

## Estrutura do Projeto

```
treino/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── navigation.tsx
│   ├── calendar.tsx
│   ├── tabs/
│   │   ├── home-tab.tsx
│   │   ├── workout-tab.tsx
│   │   ├── diet-tab.tsx
│   │   └── calendar-tab.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   ├── utils.ts
│   ├── supabase.ts
│   └── ollama.ts
├── supabase/
│   └── schema.sql
├── public/
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Uso

### Treinos

1. Vá para a aba "Treinos"
2. Adicione exercícios manualmente ou use a IA para gerar treinos
3. Escolha entre musculação ou corrida
4. Defina séries e repetições

### Dieta

1. Vá para a aba "Dieta"
2. Adicione alimentos e a IA calculará as calorias automaticamente
3. Acompanhe seu consumo diário
4. Use a IA para gerar dietas personalizadas

### Calendário

1. Vá para a aba "Calendário"
2. Clique em uma data para ver os eventos
3. Visualize treinos e dietas organizados

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

MIT
