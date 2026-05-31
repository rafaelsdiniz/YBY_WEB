import "./SemaforoBadge.css";

const ROTULOS = {
  VERDE: "Situação boa",
  AMARELO: "Requer atenção",
  VERMELHO: "Situação crítica",
  SEM_DADO: "Sem dados",
};

// Etiqueta colorida do semaforo. Use compact para a versao so-bolinha (ranking).
export default function SemaforoBadge({ semaforo, compact = false }) {
  const chave = semaforo || "SEM_DADO";
  const classe = `semaforo semaforo--${chave.toLowerCase()}`;
  if (compact) {
    return <span className={`${classe} semaforo--dot`} title={ROTULOS[chave]} />;
  }
  return <span className={classe}>{ROTULOS[chave] ?? "Sem dados"}</span>;
}
