# Guia de Deploy - Treino App

## Passo 1: Configurar Supabase

### 1.1 Criar projeto no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou Google
4. Clique em "New Project"
5. Preencha:
   - **Name**: treino-app
   - **Database Password**: (crie uma senha forte e salve)
   - **Region**: Escolha a região mais próxima de você (ex: South America)
6. Clique em "Create new project"
7. Aguarde cerca de 2 minutos para o projeto ser criado

### 1.2 Executar o schema SQL
1. No painel do Supabase, vá em **SQL Editor** (ícone de terminal no menu lateral)
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor SQL
5. Clique em "Run" (ou pressione Ctrl+Enter)
6. Aguarde a mensagem "Success. No rows returned"

### 1.3 Obter credenciais
1. No painel do Supabase, vá em **Settings** > **API**
2. Copie:
   - **Project URL** (algo como `https://xxxxxxxx.supabase.co`)
   - **anon public** key (a primeira key listada)
3. Salve essas informações, você precisará delas

## Passo 2: Configurar Ollama Cloud

### 2.1 Criar conta
1. Acesse [https://ollama.cloud](https://ollama.cloud)
2. Clique em "Sign up"
3. Crie sua conta
4. Verifique seu email

### 2.2 Obter API Key
1. Faça login no Ollama Cloud
2. Vá em **Settings** > **API Keys**
3. Clique em "Create new API key"
4. Dê um nome para a key (ex: "treino-app")
5. Copie a API key gerada
6. **IMPORTANTE**: Salve a key em lugar seguro, você não poderá vê-la novamente

## Passo 3: Preparar para Deploy

### 3.1 Criar repositório no GitHub
1. Acesse [https://github.com](https://github.com)
2. Clique em "+" > "New repository"
3. Preencha:
   - **Repository name**: treino-app
   - **Description**: App de gestão de treinos e dieta com IA
   - Marque "Public" ou "Private" (sua escolha)
4. Clique em "Create repository"

### 3.2 Fazer push do código
No terminal, na pasta do projeto:

```bash
# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit"

# Adicionar remote (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/treino-app.git

# Fazer push
git branch -M main
git push -u origin main
```

## Passo 4: Deploy no Vercel

### 4.1 Criar conta no Vercel
1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Faça login com GitHub (recomendado)

### 4.2 Importar projeto
1. No dashboard do Vercel, clique em "Add New" > "Project"
2. Você verá seu repositório `treino-app` na lista
3. Clique em "Import"

### 4.3 Configurar o projeto
1. **Framework Preset**: Next.js (deve ser detectado automaticamente)
2. **Root Directory**: `./` (padrão)
3. Clique em "Configure"

### 4.4 Configurar variáveis de ambiente
Na seção "Environment Variables", adicione:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sua URL do Supabase (ex: `https://xxxxxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sua anon key do Supabase |
| `OLLAMA_CLOUD_API_KEY` | Sua API key do Ollama Cloud |
| `OLLAMA_CLOUD_URL` | `https://api.ollama.cloud` |

**IMPORTANTE**: Clique em "Add" para cada variável após preencher

### 4.5 Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build (cerca de 2-3 minutos)
3. Quando terminar, você verá uma mensagem de sucesso
4. Seu site estará disponível em um URL como: `https://treino-app-xxxxx.vercel.app`

## Passo 5: Testar o Deploy

1. Acesse o URL fornecido pelo Vercel
2. Teste todas as funcionalidades:
   - Navegação entre abas
   - Preencher perfil
   - Adicionar exercícios
   - Adicionar alimentos
   - Chat com IA (se configurou Ollama Cloud)

## Passo 6: Domínio Personalizado (Opcional)

### 6.1 Comprar domínio
1. Compre um domínio em [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), etc.
2. Exemplo: `meutreino.com`

### 6.2 Configurar no Vercel
1. No projeto do Vercel, vá em **Settings** > **Domains**
2. Clique em "Add"
3. Digite seu domínio (ex: `meutreino.com`)
4. Siga as instruções para configurar os DNS

## Troubleshooting

### Erro: "Cannot find module"
- Execute `npm install` localmente e faça commit do package-lock.json

### Erro: "Supabase connection failed"
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o projeto Supabase está ativo

### Erro: "Ollama Cloud API error"
- Verifique se a API key está correta
- Verifique se você tem créditos no Ollama Cloud

### Build falha no Vercel
- Verifique os logs de build no Vercel
- Certifique-se de que todas as dependências estão no package.json

## Atualizações Futuras

Para fazer atualizações no site:

1. Faça as alterações localmente
2. Commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push
   ```
3. O Vercel fará deploy automático

## Suporte

- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Ollama Cloud**: [https://ollama.cloud/docs](https://ollama.cloud/docs)
