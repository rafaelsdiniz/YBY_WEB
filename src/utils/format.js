// Formatadores null-safe: quando o dado ainda nao veio da API (null/undefined),
// mostram "—" em vez de inventar 0. Assim a UI fica honesta enquanto o backend
// nao popula score/KPI/indicadores, e se preenche sozinha quando o dado chega.

export const SEM_DADO = "—";

export function temValor(v) {
  return v !== null && v !== undefined && !Number.isNaN(Number(v));
}

// Numero com casas decimais opcionais.
export function numero(v, dec = 0) {
  if (!temValor(v)) return SEM_DADO;
  return Number(v).toLocaleString("pt-BR", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

// Moeda BRL.
export function moeda(v) {
  if (!temValor(v)) return SEM_DADO;
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

// Percentual (valor ja em 0–100).
export function pct(v) {
  if (!temValor(v)) return SEM_DADO;
  return `${numero(v)}%`;
}
