// Assistente do YBY. Hoje responde com base nos dados reais (mock grounded);
// troque USE_MOCK para false para plugar um LLM via back (POST /assistente).
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const ROTULO = {
  VERDE: "pode investir",
  AMARELO: "investir com cuidado",
  VERMELHO: "não investir agora",
};
const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const real = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function resumo(m) {
  const p = m.pendencias.length ? m.pendencias.join("; ") : "nenhuma";
  return `${m.nome}: semáforo ${m.semaforo} (${ROTULO[m.semaforo]}), prioridade ${m.prioridade}/100, risco ${m.notaRisco}/100, retorno de ${m.retornoPorReal} por R$ investido, conformidade ${m.conformidade}%. Pendências: ${p}.`;
}

// Motor de respostas baseado nos dados (heurística por palavras-chave).
function responder(msg, municipios) {
  const q = norm(msg);
  if (!municipios.length) return "Ainda estou carregando os dados do Tocantins. Tente de novo em instantes.";

  // município citado pelo nome
  const citado = municipios.find((m) => q.includes(norm(m.nome)));
  if (citado) return resumo(citado);

  if (/(ola|olá|oi|bom dia|boa tarde|ajuda|o que voce|pode fazer)/.test(q)) {
    return "Olá! Sou o assistente do YBY. Posso responder sobre prioridade de investimento, risco, desperdício e conformidade dos municípios do Tocantins. Ex.: \"onde investir primeiro?\", \"quais estão em risco?\", \"tem desperdício?\" ou cite um município.";
  }

  if (/(onde investir|prioridade|primeiro|urgente|mais urgente|investir)/.test(q)) {
    const top = [...municipios].sort((a, b) => b.prioridade - a.prioridade).slice(0, 3);
    return (
      "Por prioridade de investimento, os mais urgentes são:\n" +
      top.map((m, i) => `${i + 1}. ${m.nome} — prioridade ${m.prioridade}/100 (${ROTULO[m.semaforo]})`).join("\n")
    );
  }

  if (/(risco|vermelho|nao investir|não investir|perigo)/.test(q)) {
    const r = municipios.filter((m) => m.semaforo === "VERMELHO");
    if (!r.length) return "Nenhum município está em risco alto (vermelho) no momento.";
    return (
      "Municípios em risco alto (não investir agora):\n" +
      r.map((m) => `• ${m.nome} — risco ${m.notaRisco}/100; ${m.pendencias.join("; ") || "sem pendências registradas"}`).join("\n")
    );
  }

  if (/(desperdicio|desperdício|gasto|gastando|ineficiente)/.test(q)) {
    const d = municipios.filter((m) => m.desperdicio);
    if (!d.length) return "Não há municípios marcados como desperdício na base atual.";
    return (
      "Municípios com desperdício (gastam muito e rendem pouco):\n" +
      d.map((m) => `• ${m.nome} — gasto ${real(m.gastoPublico)}, retorno ${m.retornoPorReal} por R$`).join("\n")
    );
  }

  if (/(verde|pode investir|pronto|melhor|seguro)/.test(q)) {
    const v = municipios.filter((m) => m.semaforo === "VERDE");
    if (!v.length) return "Nenhum município está como verde (pronto para investir) agora.";
    return "Prontos para investir (verde):\n" + v.map((m) => `• ${m.nome} — retorno ${m.retornoPorReal} por R$, conformidade ${m.conformidade}%`).join("\n");
  }

  if (/(conformidade|car|regular)/.test(q)) {
    const media = Math.round(municipios.reduce((s, m) => s + m.conformidade, 0) / municipios.length);
    const melhor = [...municipios].sort((a, b) => b.conformidade - a.conformidade)[0];
    return `A conformidade média (CAR) é ${media}%. Maior conformidade: ${melhor.nome} (${melhor.conformidade}%).`;
  }

  if (/(quantos|total|numero|número)/.test(q)) {
    const v = municipios.filter((m) => m.semaforo === "VERDE").length;
    const a = municipios.filter((m) => m.semaforo === "AMARELO").length;
    const r = municipios.filter((m) => m.semaforo === "VERMELHO").length;
    return `Há ${municipios.length} municípios na base: ${v} verdes, ${a} amarelos e ${r} vermelhos.`;
  }

  if (/(desmatamento|deter|queda)/.test(q)) {
    const melhor = [...municipios].sort((a, b) => b.reducaoDesmatamento - a.reducaoDesmatamento)[0];
    return `Maior redução de desmatamento: ${melhor.nome} (${melhor.reducaoDesmatamento}%). Pergunte por um município para ver a série completa no painel.`;
  }

  return "Posso ajudar com prioridade de investimento, risco, desperdício, conformidade e desmatamento dos municípios. Tente: \"onde investir primeiro?\", \"quais estão em risco?\" ou cite um município (ex.: Palmas).";
}

export async function perguntar(mensagem, municipios = []) {
  if (USE_MOCK) {
    await delay(600);
    return responder(mensagem, municipios);
  }
  const res = await fetch(`${BASE_URL}/assistente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensagem }),
  });
  if (!res.ok) throw new Error("O assistente está indisponível no momento.");
  const data = await res.json();
  return data.resposta;
}
