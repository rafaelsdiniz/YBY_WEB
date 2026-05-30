import { MUNICIPIOS_MOCK } from "../mocks/municipios";

// Troque para false quando a API Spring existir. Nenhum componente muda.
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// simula a latência da rede para o app já nascer "assíncrono"
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getMunicipios() {
  if (USE_MOCK) {
    await delay(300);
    return MUNICIPIOS_MOCK;
  }
  const res = await fetch(`${BASE_URL}/municipios`);
  if (!res.ok) throw new Error("Falha ao carregar municípios");
  return res.json();
}

export async function getMunicipio(id) {
  if (USE_MOCK) {
    await delay(200);
    return MUNICIPIOS_MOCK.find((m) => m.id === id) ?? null;
  }
  const res = await fetch(`${BASE_URL}/municipios/${id}`);
  if (!res.ok) throw new Error("Falha ao carregar município");
  return res.json();
}
