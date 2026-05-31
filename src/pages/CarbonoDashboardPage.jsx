import { useEffect, useMemo, useState } from "react";
import { painelCarbono } from "../services/carbonoDashboard";
import { getMunicipios } from "../services/api";
import { useToast } from "../context/ToastContext";
import { moeda, numero } from "../utils/format";
import { rotulo, CREDITO_STATUS, INSTITUICAO_TIPO } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

// Painel executivo consolidado de carbono: projecao financeira, projetos JREDD+,
// potencial do Plano Safra e mercado comprador (GET /carbono/dashboard).
export default function CarbonoDashboardPage() {
  const toast = useToast();
  const [ano, setAno] = useState("");
  const [dados, setDados] = useState(null);
  const [nomes, setNomes] = useState(new Map());
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then((ms) => setNomes(new Map(ms.map((m) => [String(m.apiId), m.nome]))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    painelCarbono(ano || undefined)
      .then(setDados)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
  }, [ano, toast]);

  const porStatus = useMemo(
    () => Object.entries(dados?.creditosPorStatus || {}),
    [dados]
  );
  const porTipo = useMemo(
    () => Object.entries(dados?.instituicoesPorTipo || {}),
    [dados]
  );
  const nomeMun = (id) => nomes.get(String(id)) || `Município #${id}`;

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Painel de carbono</h1>
          <p>Visão executiva consolidada do mercado de crédito de carbono</p>
        </div>
        <label className="campo estreito" style={{ margin: 0 }}>
          <span>Ano base</span>
          <input
            type="number"
            placeholder="todos"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </label>
      </header>

      {carregando ? (
        <p className="estado">Carregando painel…</p>
      ) : !dados ? (
        <p className="painel-vazio">Não foi possível carregar o painel.</p>
      ) : (
        <>
          <section className="card">
            <div className="kpi-grid">
              <Kpi rotulo="Créditos cadastrados" valor={numero(dados.totalCreditos)} />
              <Kpi rotulo="Projetos JREDD+" valor={numero(dados.totalProjetosJredd)} />
              <Kpi rotulo="Instituições" valor={numero(dados.totalInstituicoes)} />
              <Kpi
                rotulo="tCO₂e projetado"
                valor={numero(dados.tco2eProjetadoTotal)}
                sub="horizonte total"
              />
              <Kpi
                rotulo="Receita projetada"
                valor={moeda(dados.receitaProjetadaTotalReais)}
                sub="crédito de carbono"
              />
              <Kpi
                rotulo="Potencial Plano Safra"
                valor={moeda(dados.potencialFinanciamentoSafraReais)}
                sub={`${numero(dados.linhasCarbonoAtivas)} linhas de carbono`}
              />
            </div>
          </section>

          <div className="painel-2col">
            <section className="card">
              <h2 className="grafico-titulo">Créditos por status</h2>
              <ul className="painel-chips">
                {porStatus.length === 0 && <li className="painel-vazio">Sem créditos.</li>}
                {porStatus.map(([st, qtd]) => (
                  <li key={st}>
                    <span className="selo selo--neutro">{rotulo(CREDITO_STATUS, st)}</span>
                    <strong>{numero(qtd)}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card">
              <h2 className="grafico-titulo">Instituições por tipo</h2>
              <ul className="painel-chips">
                {porTipo.length === 0 && <li className="painel-vazio">Sem instituições.</li>}
                {porTipo.map(([tp, qtd]) => (
                  <li key={tp}>
                    <span className="selo selo--neutro">{rotulo(INSTITUICAO_TIPO, tp)}</span>
                    <strong>{numero(qtd)}</strong>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="card">
            <h2 className="grafico-titulo">Projeção financeira anual</h2>
            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th className="dir">tCO₂e projetada</th>
                    <th className="dir">Preço/t</th>
                    <th className="dir">Receita projetada</th>
                  </tr>
                </thead>
                <tbody>
                  {(dados.serieAnual || []).map((s) => (
                    <tr key={s.ano}>
                      <td>{s.ano}</td>
                      <td className="dir">{numero(s.toneladasProjetadas)}</td>
                      <td className="dir">{moeda(s.precoToneladaAno)}</td>
                      <td className="dir">{moeda(s.receitaProjetadaReais)}</td>
                    </tr>
                  ))}
                  {(dados.serieAnual || []).length === 0 && (
                    <tr><td colSpan={4} className="admin-vazio">Sem projeção disponível.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="painel-2col">
            <section className="card">
              <h2 className="grafico-titulo">Top municípios por receita</h2>
              <div className="admin-tabela-wrap">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Município</th>
                      <th className="dir">tCO₂e</th>
                      <th className="dir">Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dados.topMunicipios || []).map((m) => (
                      <tr key={m.municipioId}>
                        <td className="admin-nome">{nomeMun(m.municipioId)}</td>
                        <td className="dir">{numero(m.tco2eTotal)}</td>
                        <td className="dir">{moeda(m.receitaTotalReais)}</td>
                      </tr>
                    ))}
                    {(dados.topMunicipios || []).length === 0 && (
                      <tr><td colSpan={3} className="admin-vazio">Sem dados.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card">
              <h2 className="grafico-titulo">Melhores compradores</h2>
              <div className="admin-tabela-wrap">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Instituição</th>
                      <th>Tipo</th>
                      <th className="dir">Preço/t</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(dados.melhoresCompradores || []).map((c) => (
                      <tr key={c.instituicaoId}>
                        <td className="admin-nome">{c.nome}</td>
                        <td className="admin-mut">{rotulo(INSTITUICAO_TIPO, c.tipo)}</td>
                        <td className="dir">
                          {c.precoTonelada == null ? "—" : `${numero(c.precoTonelada, 2)} ${c.moeda || ""}`}
                        </td>
                      </tr>
                    ))}
                    {(dados.melhoresCompradores || []).length === 0 && (
                      <tr><td colSpan={3} className="admin-vazio">Sem compradores.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <p className="painel-meta">
            Algoritmo {dados.versaoAlgoritmo} · gerado em{" "}
            {dados.geradoEm ? new Date(dados.geradoEm).toLocaleString("pt-BR") : "—"}
          </p>
        </>
      )}
    </>
  );
}

function Kpi({ rotulo, valor, sub }) {
  return (
    <div className="kpi-box">
      <span className="kpi-rotulo">{rotulo}</span>
      <span className="kpi-valor">{valor}</span>
      {sub && <span className="kpi-sub">{sub}</span>}
    </div>
  );
}
