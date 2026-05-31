import "./Legenda.css";

const ITENS = [
  { cor: "var(--verde)", titulo: "Situação boa", desc: "indicadores saudáveis" },
  { cor: "var(--amarelo)", titulo: "Requer atenção", desc: "pontos a acompanhar" },
  { cor: "var(--vermelho)", titulo: "Situação crítica", desc: "alerta elevado (embargo, desmatamento)" },
  { cor: "var(--sem-dado)", titulo: "Sem dados", desc: "município fora da base" },
];

// Explica o significado de cada cor do mapa.
export default function Legenda() {
  return (
    <ul className="legenda">
      {ITENS.map((it) => (
        <li key={it.titulo} className="legenda-item">
          <span className="legenda-cor" style={{ background: it.cor }} />
          <span>
            <strong>{it.titulo}</strong>
            <span className="legenda-desc"> - {it.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
