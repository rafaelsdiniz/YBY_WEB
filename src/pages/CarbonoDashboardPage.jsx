import { useEffect, useMemo, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend,
} from "recharts";
import {
  TrendingUp, Leaf, Building2, MapPin, Coins,
  Activity, DollarSign, Info,
} from "lucide-react";
import { painelCarbono } from "../services/carbonoDashboard";
import { getMunicipios } from "../services/api";
import { useToast } from "../context/ToastContext";
import { moeda, numero, temValor } from "../utils/format";
import { rotulo, CREDITO_STATUS, INSTITUICAO_TIPO } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

// Painel executivo consolidado de carbono (GET /api/v1/carbono/dashboard).
// Inclui: projeção financeira, JREDD+, Plano Safra, mercado comprador,
// cotação USD/BRL e conteúdo informativo sobre crédito de carbono.

const COR_STATUS = {
  PLANEJADO:    "#94a3b8",
  EM_ANDAMENTO: "#d97706",
  CONCLUIDO:    "#16a34a",
  CANCELADO:    "#dc2626",
};

const AXIS_TICK  = { fontSize: 10, fill: "#94a3b8" };
const AXIS_PROPS = { axisLine: false, tickLine: false };
const TT_STYLE   = {
  background: "#fff", border: "1px solid #f1f5f9",
  borderRadius: 10, padding: "8px 14px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

function CardHeader({ icon: Icon, title, badge }) {
  return (
    <div className="card-header">
      <div className="card-header-icon">
        <Icon size={14} strokeWidth={2.2} />
      </div>
      <span className="card-header-title">{title}</span>
      {badge && <span className="card-header-badge">{badge}</span>}
    </div>
  );
}

const TooltipArea = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={TT_STYLE}>
      <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#0f172a", fontSize: 12 }}>Ano {label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: 0, color: "#64748b", fontSize: 12 }}>
          {p.name}:{" "}
          <strong style={{ color: "#0f172a" }}>
            {p.dataKey.includes("Usd") ? `USD ${numero(p.value, 0)}` : moeda(p.value)}
          </strong>
        </p>
      ))}
    </div>
  );
};

export default function CarbonoDashboardPage() {
  const toast = useToast();
  const [ano, setAno] = useState("");
  const [dataCotacao, setDataCotacao] = useState("");
  const [dados, setDados] = useState(null);
  const [nomes, setNomes] = useState(new Map());
  const [carregando, setCarregando] = useState(true);
  const [erroCarregar, setErroCarregar] = useState(null);

  useEffect(() => {
    getMunicipios()
      .then((ms) => setNomes(new Map(ms.map((m) => [String(m.apiId), m.nome]))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCarregando(true);
    setErroCarregar(null);
    painelCarbono({
      ano: ano || undefined,
      dataReferenciaCotacao: dataCotacao || undefined,
    })
      .then(setDados)
      .catch((err) => { setErroCarregar(err.message); toast.erro(err.message); })
      .finally(() => setCarregando(false));
  }, [ano, dataCotacao, toast]);

  const porStatus = useMemo(() => Object.entries(dados?.creditosPorStatus || {}), [dados]);
  const porTipo   = useMemo(() => Object.entries(dados?.instituicoesPorTipo || {}), [dados]);

  const barStatus = useMemo(
    () => porStatus.map(([st, qtd]) => ({ status: rotulo(CREDITO_STATUS, st), chave: st, qtd })),
    [porStatus]
  );

  const topMunBar = useMemo(
    () => (dados?.topMunicipios || []).map((m) => ({
      nome: (nomes.get(String(m.municipioId)) || `#${m.municipioId}`).slice(0, 14),
      receita: m.receitaTotalReais,
      receitaUsd: m.receitaTotalUsd,
    })),
    [dados, nomes]
  );

  const cotacao  = dados?.cotacaoDolar;
  const info     = dados?.infoCreditoCarbono;

  return (
    <div className="section-gap">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="page-header admin-header">
        <div>
          <h1>Painel de carbono</h1>
          <p>Visão executiva consolidada do mercado de crédito de carbono do Tocantins</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          <label className="campo estreito" style={{ margin: 0 }}>
            <span>Ano base</span>
            <input
              type="number"
              placeholder="todos"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </label>
          <label className="campo estreito" style={{ margin: 0 }}>
            <span>Data cotação USD</span>
            <input
              type="date"
              value={dataCotacao}
              onChange={(e) => setDataCotacao(e.target.value)}
              title="Data de referência para conversão USD→BRL"
            />
          </label>
        </div>
      </header>

      {carregando ? (
        <p className="estado">Carregando painel…</p>
      ) : erroCarregar ? (
        <section className="card"><p className="painel-vazio">Erro: {erroCarregar}</p></section>
      ) : !dados ? (
        <section className="card"><p className="painel-vazio">Dados indisponíveis.</p></section>
      ) : (
        <>
          {/* ── Cotação USD/BRL ────────────────────────────── */}
          {cotacao && (
            <section className="card" style={{ background: "linear-gradient(135deg,#f7fbf7,#f0f8f0)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <DollarSign size={18} color="#1B4A23" />
                <span style={{ fontSize: "0.84rem", color: "#1a3a1e", fontWeight: 600 }}>
                  Cotação USD/BRL de referência:
                </span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f2d16" }}>
                  R$ {numero(cotacao.taxaUsdBrl, 4)} / USD
                </span>
                <span style={{ fontSize: "0.75rem", color: "#7a9a80", marginLeft: 4 }}>
                  {cotacao.dataReferencia} · {cotacao.fonte}
                </span>
              </div>
            </section>
          )}

          {/* ── KPI row ──────────────────────────────────── */}
          <section className="card">
            <CardHeader icon={Activity} title="Métricas consolidadas" badge="YBY-API · /api/v1/carbono/dashboard" />
            <div className="kpi-grid">
              <div className="kpi-box kpi-box--azul">
                <span className="kpi-rotulo">Créditos cadastrados</span>
                <span className="kpi-valor">{numero(dados.totalCreditos)}</span>
              </div>
              <div className="kpi-box kpi-box--verde">
                <span className="kpi-rotulo">Projetos JREDD+</span>
                <span className="kpi-valor">{numero(dados.totalProjetosJredd)}</span>
              </div>
              <div className="kpi-box kpi-box--roxo">
                <span className="kpi-rotulo">Instituições</span>
                <span className="kpi-valor">{numero(dados.totalInstituicoes)}</span>
              </div>
              <div className="kpi-box kpi-box--verde">
                <span className="kpi-rotulo">tCO₂e projetado total</span>
                <span className="kpi-valor">{numero(dados.tco2eProjetadoTotal)}</span>
                <span className="kpi-sub">horizonte completo</span>
              </div>
              <div className="kpi-box kpi-box--azul">
                <span className="kpi-rotulo">Receita projetada (R$)</span>
                <span className="kpi-valor">{moeda(dados.receitaProjetadaTotalReais)}</span>
                <span className="kpi-sub">
                  {temValor(dados.receitaProjetadaTotalUsd)
                    ? `USD ${numero(dados.receitaProjetadaTotalUsd, 0)}`
                    : "em BRL"}
                </span>
              </div>
              <div className="kpi-box kpi-box--amarelo">
                <span className="kpi-rotulo">Potencial Plano Safra</span>
                <span className="kpi-valor">{moeda(dados.potencialFinanciamentoSafraReais)}</span>
                <span className="kpi-sub">{numero(dados.linhasCarbonoAtivas)} linhas carbono</span>
              </div>
            </div>
          </section>

          {/* ── Projeção anual (Area chart) ────────────────── */}
          {(dados.serieAnual || []).length > 0 && (
            <section className="card">
              <CardHeader
                icon={TrendingUp}
                title="Projeção financeira anual — receita e tCO₂e"
                badge="Série temporal · duplo eixo"
              />
              <ResponsiveContainer width="100%" height={270}>
                <AreaChart
                  data={dados.serieAnual}
                  margin={{ top: 10, right: 30, bottom: 4, left: 10 }}
                >
                  <defs>
                    <linearGradient id="carbGradR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#1B4A23" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#1B4A23" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="carbGradT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#81C931" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#81C931" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="ano" tick={AXIS_TICK} {...AXIS_PROPS} />
                  <YAxis
                    yAxisId="left"
                    tickFormatter={(v) => `R$${(v / 1e6).toFixed(1)}M`}
                    tick={AXIS_TICK} {...AXIS_PROPS}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}kt`}
                    tick={AXIS_TICK} {...AXIS_PROPS}
                  />
                  <Tooltip content={<TooltipArea />} />
                  <Legend formatter={(v) => <span style={{ fontSize: 11, color: "#64748b" }}>{v}</span>} />
                  <Area yAxisId="left"  type="monotone" dataKey="receitaProjetadaReais" name="Receita (R$)"   stroke="#1B4A23" strokeWidth={2.5} fill="url(#carbGradR)" dot={{ r: 3, fill: "#1B4A23", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  <Area yAxisId="right" type="monotone" dataKey="toneladasProjetadas"    name="tCO₂e"          stroke="#81C931" strokeWidth={2}   fill="url(#carbGradT)" dot={{ r: 3, fill: "#81C931", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </section>
          )}

          {/* ── Status + Tipos ─────────────────────────────── */}
          <div className="painel-2col">
            <section className="card">
              <CardHeader icon={Leaf} title="Créditos por status" badge="Barras" />
              {barStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barStatus} margin={{ top: 10, right: 10, bottom: 4, left: -20 }} barCategoryGap="35%">
                    <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
                    <XAxis dataKey="status" tick={{ fontSize: 10, fill: "#94a3b8" }} {...AXIS_PROPS} />
                    <YAxis allowDecimals={false} tick={AXIS_TICK} {...AXIS_PROPS} />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.03)" }}
                      content={({ active, payload, label }) =>
                        active && payload?.length ? (
                          <div style={TT_STYLE}>
                            <p style={{ margin: "0 0 3px", fontWeight: 700, color: "#0f172a", fontSize: 12 }}>{label}</p>
                            <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
                              <strong style={{ color: COR_STATUS[payload[0].payload.chave] || "#64748b" }}>
                                {numero(payload[0].value)}
                              </strong>{" "}crédito(s)
                            </p>
                          </div>
                        ) : null
                      }
                    />
                    <Bar dataKey="qtd" radius={[5, 5, 0, 0]}>
                      {barStatus.map((d, i) => (
                        <Cell key={i} fill={COR_STATUS[d.chave] || "#94a3b8"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="painel-vazio">Sem créditos cadastrados.</p>
              )}
            </section>

            <section className="card">
              <CardHeader icon={Building2} title="Instituições por tipo" />
              {porTipo.length > 0 ? (
                <ul className="painel-chips">
                  {porTipo.map(([tp, qtd]) => (
                    <li key={tp}>
                      <span className="selo selo--neutro">{rotulo(INSTITUICAO_TIPO, tp)}</span>
                      <strong>{numero(qtd)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="painel-vazio">Sem instituições cadastradas.</p>
              )}
            </section>
          </div>

          {/* ── Top municípios ─────────────────────────────── */}
          {topMunBar.length > 0 && (
            <section className="card">
              <CardHeader
                icon={MapPin}
                title="Top municípios por receita de carbono projetada"
                badge="Barras horizontais"
              />
              <ResponsiveContainer width="100%" height={Math.max(180, topMunBar.length * 44)}>
                <BarChart
                  layout="vertical"
                  data={topMunBar}
                  margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid horizontal={false} stroke="#f1f5f9" strokeDasharray="0" />
                  <XAxis type="number" tickFormatter={(v) => `R$${(v/1e6).toFixed(1)}M`} tick={AXIS_TICK} {...AXIS_PROPS} />
                  <YAxis type="category" dataKey="nome" width={110} tick={{ fontSize: 11.5, fill: "#475569" }} {...AXIS_PROPS} />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div style={TT_STYLE}>
                          <p style={{ margin: "0 0 3px", fontWeight: 700, color: "#0f172a", fontSize: 12 }}>{label}</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
                            Receita: <strong style={{ color: "#1B4A23" }}>{moeda(payload[0].value)}</strong>
                          </p>
                          {temValor(payload[0].payload.receitaUsd) && (
                            <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
                              USD: <strong style={{ color: "#1B4A23" }}>USD {numero(payload[0].payload.receitaUsd, 0)}</strong>
                            </p>
                          )}
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="receita" name="Receita (R$)" fill="#1B4A23" radius={[0, 5, 5, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </section>
          )}

          {/* ── Melhores compradores ────────────────────────── */}
          {(dados.melhoresCompradores || []).length > 0 && (
            <section className="card">
              <CardHeader icon={Coins} title="Melhores compradores de créditos" />
              <div className="admin-tabela-wrap">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Instituição</th>
                      <th>Tipo</th>
                      <th className="dir">Preço/t (original)</th>
                      <th className="dir">Preço/t (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.melhoresCompradores.map((c, idx) => (
                      <tr key={c.instituicaoId}>
                        <td className="admin-mut">{idx + 1}</td>
                        <td className="admin-nome">{c.nome}</td>
                        <td className="admin-mut">{rotulo(INSTITUICAO_TIPO, c.tipo)}</td>
                        <td className="dir">
                          {temValor(c.precoTonelada)
                            ? `${numero(c.precoTonelada, 2)} ${c.moeda || ""}`.trim()
                            : "N/D"}
                        </td>
                        <td className="dir">
                          {temValor(c.precoToneladaBrl)
                            ? moeda(c.precoToneladaBrl)
                            : "N/D"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Info educativa (vem do backend) ─────────────── */}
          {info && (
            <section className="card">
              <CardHeader icon={Info} title="Sobre crédito de carbono — JREDD+" badge="conteúdo educativo" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "O que é?", texto: info.oQueE },
                  { label: "Origem dos recursos", texto: info.origemRecurso },
                  { label: "Como funciona a projeção", texto: info.comoFuncionaProjecao },
                  { label: "Unidade tCO₂e", texto: info.unidadeMedida },
                  { label: "Padrões de certificação", texto: info.padroesCertificacao },
                ].map((item) => (
                  <div key={item.label}>
                    <p style={{ margin: "0 0 4px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: "#5a7a60" }}>
                      {item.label}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.83rem", color: "#1e3a2f", lineHeight: 1.65 }}>
                      {item.texto}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <p className="painel-meta">
            Algoritmo {dados.versaoAlgoritmo ?? "N/D"} · gerado em{" "}
            {dados.geradoEm ? new Date(dados.geradoEm).toLocaleString("pt-BR") : "N/D"}
          </p>
        </>
      )}
    </div>
  );
}
