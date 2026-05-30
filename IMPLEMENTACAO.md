# YBY — JREDD+ Intelligence · Guia de Implementação

Passo a passo para construir o sistema completo, **uma feature por etapa**. Cada
etapa traz: objetivo, arquivos envolvidos, passos e como validar. As etapas 0–7
já estão implementadas neste repositório (um commit por feature); as etapas 8–10
são o caminho para o "sistema completo" (backend real e publicação).

> Stack: **Vite + React 19**. Mapa em **SVG com `d3-geo`** (offline, sem tiles).
> Gráfico com **recharts**. Dados atrás de uma camada de serviço com flag
> `USE_MOCK` — troca mock → API sem tocar em componente.

**Legenda de status:** ✅ feito · ⬜ a fazer

---

## Etapa 0 — Estrutura inicial (scaffold) ✅

**Objetivo:** projeto React rodando em segundos.

**Passos:**
1. `npm create vite@latest yby -- --template react`
2. `npm install`
3. Adicionar `context.md` ao `.gitignore` (documento de planejamento, não versionar).
4. Commit inicial.

**Validação:** `npm run dev` abre em `http://localhost:5173`.

---

## Etapa 1 — Fundação: paleta de cores + camada de dados ✅

**Objetivo:** base visual e o desacoplamento mock → API (a peça mais importante
da arquitetura).

**Arquivos:**
- `src/index.css` — tokens de cor (navy, teal, semáforo verde/amarelo/vermelho).
- `src/mocks/municipios.js` — 6 municípios reais do TO (dados fictícios).
- `src/services/api.js` — `getMunicipios()` / `getMunicipio(id)` com `USE_MOCK`.
- `src/App.jsx` — carrega os dados via serviço e monta o shell do dashboard.

**Passos:**
1. Jogar a paleta da identidade no CSS global.
2. Criar os mocks seguindo o contrato de dados (ver abaixo).
3. Criar `api.js` com `const USE_MOCK = true` e `delay()` para simular rede.
4. `App` chama `getMunicipios()` num `useEffect` e guarda em estado.

**Contrato de dados (mande ao time de back):**
```ts
interface Municipio {
  id: string;              // código IBGE de 7 dígitos, ex: "1721000"
  nome: string;
  prioridade: number;      // 0–100, quanto maior mais urgente
  semaforo: "VERDE" | "AMARELO" | "VERMELHO";
  notaRisco: number;       // 0–100
  gastoPublico: number;    // R$
  retornoPorReal: number;  // resultado ambiental por R$
  desperdicio: boolean;
  reducaoDesmatamento: number; // %
  conformidade: number;        // %
  pendencias: string[];
  serieDesmatamento: { ano: number; valor: number }[];
}
```

**Validação:** os nomes dos municípios aparecem na tela.

---

## Etapa 2 — Mapa interativo do Tocantins (DESTAQUE) ✅

**Objetivo:** o coração do produto — mapa colorido por prioridade, clicável e
**offline**.

**Arquivos:**
- `src/assets/to-municipios.json` — GeoJSON dos 139 municípios do TO.
- `src/components/MapaTocantins.jsx` / `.css`.

**Passos:**
1. Baixar o GeoJSON e salvar **localmente** (nunca apontar para URL ao vivo):
   fonte `tbrugz/geodata-br` → `geojson/geojs-17-mun.json`.
2. Conferir que os IDs dos mocks batem com `geo.properties.id` (código IBGE).
3. Renderizar com `d3-geo`: `geoMercator().fitSize([w,h], geoTO)` + `geoPath()`,
   um `<path>` por município.
4. Colorir cada `<path>` pelo `semaforo` (cinza para sem-dado).
5. `onClick` dispara `onSelecionar(id)`; destacar o selecionado com borda.

> **Por que `d3-geo` e não `react-simple-maps`?** O `react-simple-maps@3` não
> instala com React 19 (peer deps em 16/17/18). O `d3-geo` faz o mesmo desenho
> em SVG, é nativo no React 19 e mantém o demo offline.

**Validação:** mapa do TO preenche a tela e municípios da base aparecem coloridos.

---

## Etapa 3 — Ranking de municípios ✅

**Objetivo:** lista ordenada por prioridade, sincronizada com o mapa.

**Arquivos:**
- `src/components/RankingMunicipios.jsx` / `.css`.
- `src/components/SemaforoBadge.jsx` / `.css` (reutilizável; variante compacta).

**Passos:**
1. Ordenar por `prioridade` (desc).
2. Cada item é um `<button>` que dispara `onSelecionar(id)`.
3. Estado de seleção fica no `App` e é passado a mapa e ranking — clicar em
   qualquer um seleciona o mesmo município.
4. Mostrar a bolinha do semáforo (`SemaforoBadge compact`).

**Validação:** clicar no ranking destaca o município no mapa e vice-versa.

---

## Etapa 4 — Painel de detalhe + KpiCard ✅

**Objetivo:** ao selecionar, mostrar os indicadores que sustentam a decisão.

**Arquivos:**
- `src/components/DetalheMunicipio.jsx` / `.css`.
- `src/components/KpiCard.jsx` / `.css` (tom neutro/bom/ruim colore o valor).

**Passos:**
1. Cabeçalho com nome + `SemaforoBadge` (rótulo completo).
2. KPIs: retorno por R$, nota de risco, redução do desmatamento, conformidade.
3. Gasto público formatado em BRL.
4. Lista de `pendencias` (ou "nenhuma pendência").

**Validação:** o painel troca de conteúdo conforme o município selecionado.

---

## Etapa 5 — Alerta de desperdício + Legenda ✅

**Objetivo:** chamar atenção para gasto ineficiente e explicar as cores.

**Arquivos:**
- `src/components/AlertaDesperdicio.jsx` / `.css` (só renderiza se `desperdicio`).
- `src/components/Legenda.jsx` / `.css`.

**Passos:**
1. `AlertaDesperdicio` no topo do detalhe quando `municipio.desperdicio === true`.
2. `Legenda` abaixo do mapa, com o significado de cada cor.

**Validação:** Araguaína/Lagoa da Confusão exibem a faixa de desperdício.

---

## Etapa 6 — Gráfico de evolução do desmatamento ✅

**Objetivo:** mostrar a tendência ao longo dos anos.

**Arquivos:**
- `src/components/GraficoDesmatamento.jsx` / `.css`.

**Passos:**
1. `npm install recharts` (compatível com React 19).
2. `LineChart` com `serieDesmatamento` dentro do detalhe.
3. Tooltip em km² por ano.

**Validação:** o gráfico aparece e muda com o município selecionado.

---

## Etapa 7 — Exportar relatório em PDF (diferencial) ✅

**Objetivo:** gerar um relatório imprimível do município.

**Arquivos:**
- `src/components/RelatorioPdf.jsx` / `.css`.

**Passos:**
1. Botão que chama `window.print()`.
2. CSS `@media print` isola apenas o `.detalhe` (esconde mapa, ranking, etc.).

**Validação:** o diálogo de impressão mostra só o relatório do município
(o usuário escolhe "Salvar como PDF"). Sem dependências extras, funciona offline.

---

## Etapa 8 — Identidade visual do Tocantins ✅

**Objetivo:** dar a cara institucional do estado: branco, amarelo, azul e verde.

**Arquivos:** `src/index.css` (tokens) + ajustes nos `.css` dos componentes.

**Passos:**
1. Definir os tokens: `--azul` (marca), `--azul-escuro` (títulos), `--amarelo`
   e `--verde` (acentos), sobre `--branco`/`--cinza-claro`.
2. Trocar navy/teal por azul em headings, KPIs, ranking, botões.
3. Manter o **vermelho** apenas no semáforo (significado funcional).

---

## Etapa 9 — Roteamento + navbar institucional ✅

**Objetivo:** virar um sistema de múltiplas páginas.

**Arquivos:**
- `src/main.jsx` (BrowserRouter), `src/App.jsx` (rotas).
- `src/components/Navbar.jsx` / `.css`, `src/components/Layout.jsx`.
- `src/pages/DashboardPage.jsx`, `src/pages/PlaceholderPage.jsx`.

**Passos:**
1. `npm install react-router-dom`.
2. `Navbar` limpa: faixa institucional (amarelo/azul/verde), marca YBY, links
   (Painel/Municípios/Relatórios/Sobre) com estado ativo, botão Entrar.
3. `Layout` = navbar fixa + `<Outlet/>`; mover o dashboard para `DashboardPage`.
4. `PlaceholderPage` para rotas ainda não implementadas (sem 404).

---

## Etapa 10 — Página de login ✅

**Objetivo:** área de acesso institucional.

**Arquivos:**
- `src/pages/LoginPage.jsx` / `.css`.
- `src/services/auth.js` (login mockado, padrão `USE_MOCK`).

**Passos:**
1. Layout split: painel azul da marca + formulário limpo (e-mail/senha).
2. Estados de erro e loading; `login()` na camada de serviço.
3. Rota `/login` **fora** do `Layout` (tela cheia, sem navbar).
4. Backend depois: `USE_MOCK = false` → `POST /auth/login`.

---

## Etapa 11 — Integração com a API (Spring) ⬜

**Objetivo:** trocar os mocks pelos dados reais do backend, sem tocar em
componente.

**Passos:**
1. Criar `.env` com `VITE_API_URL=http://localhost:8080/api`.
2. Em `src/services/api.js`, mudar `USE_MOCK` para `false`.
3. Garantir que os endpoints devolvem **exatamente** o contrato da Etapa 1:
   | Método | Rota | Devolve |
   |---|---|---|
   | `GET` | `/api/municipios` | lista de `Municipio` (sem `serieDesmatamento`) |
   | `GET` | `/api/municipios/{id}` | `Municipio` completo |
4. Habilitar **CORS** no Spring para `http://localhost:5173`.

**Validação:** o app funciona idêntico, agora consumindo a API.

---

## Etapa 12 — Evidências georreferenciadas (diferencial) ⬜

**Objetivo:** anexar fotos/provas por município.

**Passos:**
1. Endpoint `GET /api/municipios/{id}/evidencias`.
2. Função `getEvidencias(id)` na camada de serviço (com mock primeiro).
3. Galeria no detalhe (lazy-load das imagens).

---

## Etapa 13 — Build e deploy ⬜

**Objetivo:** publicar o front.

**Passos:**
1. `npm run build` (gera `dist/`).
2. Publicar `dist/` em Vercel/Netlify/GitHub Pages.
3. Definir `VITE_API_URL` de produção nas variáveis de ambiente do host.

**Validação:** URL pública abre o dashboard.

---

## Checklist do "demo à prova de falhas"

- [ ] Todos os dados locais (mock + GeoJSON no projeto). Nada depende da internet.
- [ ] Mapa colore corretamente verde/amarelo/vermelho.
- [ ] Clique no mapa e no ranking seleciona o mesmo município.
- [ ] Detalhe mostra os KPIs principais.
- [ ] Troca para API real é só `USE_MOCK = false` + `VITE_API_URL`.
