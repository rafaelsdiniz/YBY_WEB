// Cliente HTTP central da YBY-API (Spring, /api/v1).
// Anexa o JWT (Bearer), serializa JSON e traduz erros RFC 7807 (Problem Details)
// em Error com mensagem amigavel. Todos os services concretos usam este modulo.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
const TOKEN_KEY = "yby_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Erro de API com status HTTP para quem quiser tratar 401/403/etc.
export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function parseErro(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    // resposta sem corpo JSON
  }
  // Problem Details (RFC 7807): detail/title; fallbacks comuns
  const msg =
    body?.detail ||
    body?.message ||
    body?.title ||
    (res.status === 401
      ? "Sessao expirada. Entre novamente."
      : res.status === 403
        ? "Voce nao tem permissao para esta acao."
        : `Falha na requisicao (${res.status}).`);
  return new ApiError(msg, res.status, body);
}

/**
 * Requisicao base.
 * @param {string} path caminho relativo ao /api/v1 (ex.: "/municipios/ranking")
 * @param {object} opts { method, body, auth=true, query, raw=false }
 */
export async function request(path, opts = {}) {
  const { method = "GET", body, auth = true, query, raw = false } = opts;

  let url = `${BASE_URL}${path}`;
  if (query) {
    const qs = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.append(k, v);
    });
    const s = qs.toString();
    if (s) url += `?${s}`;
  }

  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearToken();
  }

  if (!res.ok) {
    throw await parseErro(res);
  }

  if (raw) return res; // para downloads (PDF/blob)
  if (res.status === 204) return null;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json") || ct.includes("geo+json")) {
    return res.json();
  }
  return res.text();
}

export const http = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
