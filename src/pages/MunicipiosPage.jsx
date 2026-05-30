import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMunicipios } from "../services/api";
import Loader from "../components/Loader";
import SemaforoBadge from "../components/SemaforoBadge";
import "./MunicipiosPage.css";

const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// colunas: chave do dado, rótulo e se é numérica (para a ordenação)
const COLUNAS = [
  { chave: "nome", rotulo: "Município", num: false },
  { chave: "prioridade", rotulo: "Prioridade", num: true },
  { chave: "notaRisco", rotulo: "Risco", num: true },
  { chave: "retornoPorReal", rotulo: "Retorno/R$", num: true },
  { chave: "conformidade", rotulo: "Conformidade", num: true },
];

export default function MunicipiosPage() {
  const navigate = useNavigate();
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState({ campo: "prioridade", dir: "desc" });

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  const lista = useMemo(() => {
    const filtrados = municipios.filter((m) => norm(m.nome).includes(norm(busca)));
    const { campo, dir } = ordem;
    const fator = dir === "asc" ? 1 : -1;
    return [...filtrados].sort((a, b) => {
      if (campo === "nome") return a.nome.localeCompare(b.nome) * fator;
      return (a[campo] - b[campo]) * fator;
    });
  }, [municipios, busca, ordem]);

  function ordenarPor(campo) {
    setOrdem((o) =>
      o.campo === campo
        ? { campo, dir: o.dir === "asc" ? "desc" : "asc" }
        : { campo, dir: campo === "nome" ? "asc" : "desc" }
    );
  }

  function abrirNoPainel(id) {
    navigate("/painel", { state: { municipioId: id } });
  }

  if (carregando) {
    return <Loader texto="Carregando municípios" />;
  }

  return (
    <>
      <header className="page-header">
        <h1>Municípios</h1>
        <p>{municipios.length} municípios na base — clique para abrir no painel</p>
      </header>

      <div className="card">
        <input
          className="mun-busca"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar município..."
        />

        <div className="mun-tabela-wrap">
          <table className="mun-tabela">
            <thead>
              <tr>
                {COLUNAS.map((c) => {
                  const ativo = ordem.campo === c.chave;
                  return (
                    <th
                      key={c.chave}
                      className={c.num ? "num" : ""}
                      aria-sort={ativo ? (ordem.dir === "asc" ? "ascending" : "descending") : "none"}
                    >
                      <button type="button" onClick={() => ordenarPor(c.chave)}>
                        {c.rotulo}
                        <span className="mun-seta">{ativo ? (ordem.dir === "asc" ? "▲" : "▼") : ""}</span>
                      </button>
                    </th>
                  );
                })}
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((m) => (
                <tr key={m.id} onClick={() => abrirNoPainel(m.id)}>
                  <td className="mun-nome">{m.nome}</td>
                  <td className="num">{m.prioridade}</td>
                  <td className="num">{m.notaRisco}</td>
                  <td className="num">{m.retornoPorReal.toFixed(1)}</td>
                  <td className="num">{m.conformidade}%</td>
                  <td><SemaforoBadge semaforo={m.semaforo} /></td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td colSpan={6} className="mun-vazio">
                    Nenhum município encontrado para "{busca}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
