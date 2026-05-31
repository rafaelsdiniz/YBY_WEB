# YBY — JREDD+ Intelligence · Frontend

> Plataforma web de monitoramento ambiental e inteligência de dados para o estado do Tocantins.  
> Desenvolvida para o **Hackathon Tocantins 2026**.

---

## Equipe YBY

| Participante          | Papel principal          |
|-----------------------|--------------------------|
| Marcos Ribeiro        | Full-stack / Líder técnico |
| Guilherme Valadares   | Frontend / UX            |
| Pedro Lucas           | Backend / Dados          |
| Ana Carolina          | Frontend / Design        |
| Rafael Diniz          | Backend / Dados          |

**IAs utilizadas no desenvolvimento:** Claude (Anthropic) · Codex (OpenAI)

---

## Sobre o projeto

O **YBY** (palavra Tupi que significa *Terra*) é uma plataforma de inteligência ambiental que centraliza indicadores de desmatamento, créditos de carbono, projetos JREDD+ e geoinformações do Tocantins em um painel interativo.

### Funcionalidades principais

| Módulo | Descrição |
|--------|-----------|
| **Landing Page** | Site institucional público com mapa destaque e estatísticas do estado |
| **Painel (Dashboard)** | KPIs de desmatamento, alertas e semáforo ambiental por município |
| **Indicadores** | Gráficos e rankings de desmatamento por região/município |
| **Inteligência** | Assistente com IA para análise dos dados ambientais |
| **Carbono** | Gestão de créditos de carbono, projetos JREDD+ e instituições |
| **Geoportal** | Mapa interativo do Tocantins com dados geoespaciais |
| **Plano Safra** | Cadastro e acompanhamento de planos de safra |
| **Relatórios** | Geração de relatórios em PDF |
| **Metadados** | Catálogo de fontes e datasets |
| **Usuários** | Gerenciamento de usuários (perfil GESTOR) |

---

## Stack de tecnologias

| Tecnologia | Versão |
|------------|--------|
| **Node.js** | 24.x (mínimo recomendado: 18.x LTS) |
| **npm** | 11.x |
| **React** | 19.2.6 |
| **Vite** | 8.0.12 |
| **React Router DOM** | 7.16.0 |
| **Framer Motion** | 12.40.0 |
| **Recharts** | 3.8.1 |
| **D3-geo** | 3.1.1 |
| **Lucide React** | 1.17.0 |
| **@fontsource** (Inter / Manrope / Raleway) | 5.x |
| **ESLint** | 10.x |

**Autenticação:** JWT Bearer Token armazenado em `localStorage`  
**Comunicação com API:** `fetch` nativo (sem Axios)  
**Deploy:** Vercel (SPA rewrite configurado em `vercel.json`)

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) **v18 ou superior** (recomendado: v20 LTS ou v22 LTS)
- **npm** v9+ (já vem com o Node.js)
- O **backend YBY-API** rodando em `http://localhost:8080` — consulte o README do repositório do backend

Para verificar suas versões:

```bash
node --version
npm --version
```

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd YBY_WEB
```

### 2. Instale as dependências

```bash
npm install
```

> Caso encontre conflitos de peer dependencies, use: `npm install --legacy-peer-deps`

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta do projeto (mesmo nível do `package.json`):

```env
# URL base da API backend (padrão: http://localhost:8080/api/v1)
VITE_API_URL=http://localhost:8080/api/v1
```

> Se o backend estiver rodando na porta padrão `8080`, esse passo é **opcional** — o frontend já aponta para `http://localhost:8080/api/v1` como fallback.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O terminal exibirá algo como:

```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Acesse **http://localhost:5173** no navegador.

### 5. (Opcional) Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar o build localmente:

```bash
npm run preview
```

---

## Estrutura de pastas

```
src/
├── assets/          # GeoJSON e outros assets estáticos
├── components/      # Componentes reutilizáveis (Sidebar, Navbar, Gráficos, Mapa…)
│   └── ui/          # Componentes visuais genéricos (FlipCard, CircularCards)
├── context/         # Contextos React (Auth, Toast, Confirm)
├── mocks/           # Dados mock para desenvolvimento offline
├── pages/           # Páginas da aplicação (uma por rota)
├── services/        # Módulos de comunicação com a API
│   ├── http.js      # Cliente HTTP central (JWT, tratamento de erros RFC 7807)
│   ├── auth.js      # Login, logout, recuperação de senha
│   ├── dashboard.js
│   ├── desmatamento.js
│   ├── carbono.js
│   └── ...
└── utils/           # Utilitários de formatação
```

---

## Rotas da aplicação

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Landing Page institucional |
| `/login` | Público | Tela de login |
| `/esqueci-senha` | Público | Recuperação de senha |
| `/redefinir-senha` | Público | Redefinição de senha |
| `/painel` | Autenticado | Dashboard principal |
| `/indicadores` | Autenticado | Indicadores de desmatamento |
| `/inteligencia` | Autenticado | Assistente com IA |
| `/carbono` | Autenticado | Módulo de carbono |
| `/carbono/painel` | Autenticado | Dashboard de carbono |
| `/creditos-carbono` | Autenticado | Gestão de créditos |
| `/instituicoes-carbono` | Autenticado | Instituições de carbono |
| `/projetos` | Autenticado | Projetos JREDD+ |
| `/plano-safra` | Autenticado | Plano safra |
| `/geoportal` | Autenticado | Mapa geoespacial |
| `/relatorios` | Autenticado | Geração de relatórios |
| `/metadados` | Autenticado | Catálogo de metadados |
| `/minha-conta` | Autenticado | Perfil do usuário |
| `/usuarios` | **GESTOR** | Gerenciamento de usuários |

---

## Perfis de usuário

| Perfil | Permissões |
|--------|-----------|
| `SERVIDOR` | Acesso a todos os módulos (somente leitura/operação) |
| `GESTOR` | Acesso total, incluindo gerenciamento de usuários (`/usuarios`) |

---

## Variáveis de ambiente disponíveis

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8080/api/v1` |

---

## Exemplos de prompts utilizados no desenvolvimento

Os exemplos abaixo representam prompts reais enviados às IAs (Claude e Codex) durante o desenvolvimento do frontend:

---

### Prompt 1 — Arquitetura de serviços e cliente HTTP

> *"Crie um módulo `http.js` em JavaScript (ES Modules) que funcione como cliente HTTP central para uma API REST Spring Boot. Ele deve: (1) ler a URL base de `import.meta.env.VITE_API_URL`; (2) anexar automaticamente o JWT como header `Authorization: Bearer <token>` buscando do localStorage; (3) serializar o body como JSON; (4) tratar erros seguindo o padrão RFC 7807 (Problem Details), extraindo `detail`, `message` ou `title` do corpo da resposta; (5) limpar o token automaticamente em respostas 401; (6) expor métodos `get`, `post`, `put`, `patch` e `del`. O erro deve ser uma classe `ApiError` com propriedades `status` e `body`."*

---

### Prompt 2 — Componente de mapa interativo do Tocantins

> *"Crie um componente React `MapaTocantins.jsx` que renderize o mapa político do Tocantins usando `d3-geo` e um GeoJSON dos municípios. O mapa deve: colorir cada município de acordo com uma escala de severidade de desmatamento (verde / amarelo / vermelho); exibir tooltip com o nome do município e o valor do indicador ao passar o mouse; destacar o município selecionado com borda; ser responsivo usando um ResizeObserver; e aceitar as props `dados` (objeto municipio→valor) e `onSelect` (callback). Use SVG puro, sem bibliotecas de mapa externas."*

---

### Prompt 3 — Sistema de autenticação com React Context e rotas protegidas

> *"Implemente um sistema de autenticação completo para uma SPA React 19 com React Router DOM 7. Preciso de: (1) `AuthContext` com os estados `usuario`, `carregando` e funções `login`, `logout`; (2) `AuthProvider` que no mount faz a requisição `GET /auth/me` com o token do localStorage para restaurar a sessão; (3) componente `RequireAuth` que redireciona para `/login` se não autenticado, preservando a rota de destino em `state.from`; (4) componente `RequireRole` que recebe uma prop `role` e renderiza `<AcessoNegado />` se o perfil do usuário não corresponder; (5) na tela de login, após sucesso, redirecionar para `state.from` ou `/painel`. Não use nenhuma biblioteca de auth externa."*

---

## Problemas comuns

### A aplicação abre mas as telas ficam em branco / sem dados
Verifique se o backend YBY-API está rodando em `http://localhost:8080`. Sem o backend, as chamadas à API falharão silenciosamente.

### Erro `CORS` no console do navegador
O backend precisa liberar o origin `http://localhost:5173`. Consulte o README do backend para a configuração de CORS.

### `npm install` falha com erros de peer dependencies
Execute com a flag: `npm install --legacy-peer-deps`

### Porta 5173 já em uso
O Vite automaticamente tentará a próxima porta disponível (5174, 5175…). O endereço correto será exibido no terminal.

---

## Licença

Projeto desenvolvido para fins acadêmicos e de competição no **Hackathon Tocantins 2026**.  
Todos os direitos reservados à **Equipe YBY**.
