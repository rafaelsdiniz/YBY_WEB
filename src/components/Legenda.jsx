import "./Legenda.css";

const ITENS = [
  { cor: "var(--verde)", titulo: "Pode investir", desc: "baixo risco, bom retorno" },
  { cor: "var(--amarelo)", titulo: "Investir com cuidado", desc: "tem ressalvas a resolver" },
  { cor: "var(--vermelho)", titulo: "Não investir agora", desc: "risco alto (embargo, sobreposição)" },
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
