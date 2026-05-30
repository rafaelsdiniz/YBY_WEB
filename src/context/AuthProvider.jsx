import { useState, useCallback } from "react";
import { login as loginService } from "../services/auth";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "yby_usuario";

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const entrar = useCallback(async (email, senha) => {
    const u = await loginService(email, senha);
    setUsuario(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    return u;
  }, []);

  const sair = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}
