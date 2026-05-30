import "./SemaforoBadge.css";

const ROTULOS = {
  VERDE: "Pode investir",
  AMARELO: "Investir com cuidado",
  VERMELHO: "Não investir agora",
};

// Etiqueta colorida do semaforo. Use compact para a versao so-bolinha (ranking).
export default function SemaforoBadge({ semaforo, compact = false }) {
  const classe = `semaforo semaforo--${semaforo.toLowerCase()}`;
  if (compact) {
    return <span className={`${classe} semaforo--dot`} title={ROTULOS[semaforo]} />;
  }
  return <span className={classe}>{ROTULOS[semaforo]}</span>;
}
