import { createContext, useContext } from "react";

// Context + hook em arquivo separado do provider (.jsx) para nao disparar
// o aviso de fast-refresh (only-export-components).
export const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
