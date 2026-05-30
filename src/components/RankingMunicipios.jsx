import SemaforoBadge from "./SemaforoBadge";
import "./RankingMunicipios.css";

// Lista ordenada por prioridade, clicavel e sincronizada com o mapa
// (recebe a selecao via props e dispara onSelecionar).
const LIMITE = 12;

export default function RankingMunicipios({ municipios, selecionado, onSelecionar }) {
  const ordenado = [...municipios]
    .sort((a, b) => b.prioridade - a.prioridade)
    .slice(0, LIMITE);
  const restantes = municipios.length - ordenado.length;

  return (
    <div className="ranking">
      <h2 className="ranking-titulo">Ranking de prioridade</h2>
      <ol className="ranking-lista">
        {ordenado.map((m, i) => {
          const ativo = m.id === selecionado;
          return (
            <li key={m.id}>
              <button
                type="button"
                className={ativo ? "ranking-item ativo" : "ranking-item"}
                onClick={() => onSelecionar(m.id)}
              >
                <span className="ranking-pos">{i + 1}</span>
                <SemaforoBadge semaforo={m.semaforo} compact />
                <span className="ranking-nome">{m.nome}</span>
                <span className="ranking-prioridade">{m.prioridade}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {restantes > 0 && (
        <p className="ranking-nota">
          + {restantes} municípios — veja todos em <strong>Municípios</strong>.
        </p>
      )}
    </div>
  );
}
