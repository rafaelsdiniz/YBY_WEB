import "./AlertaDesperdicio.css";

// Faixa de destaque para municipios que gastam muito e rendem pouco
// (desperdicio: true). Nao renderiza nada quando nao ha desperdicio.
export default function AlertaDesperdicio({ ativo }) {
  if (!ativo) return null;
  return (
    <div className="alerta-desperdicio" role="alert">
      <span className="alerta-icone" aria-hidden="true">⚠️</span>
      <span>
        <strong>Desperdício detectado:</strong> alto gasto público com baixo
        retorno ambiental. Reavaliar a aplicação dos recursos.
      </span>
    </div>
  );
}
