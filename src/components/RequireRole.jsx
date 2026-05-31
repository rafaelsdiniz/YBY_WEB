import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AUTH_ATIVA } from "../authConfig";
import AcessoNegado from "./AcessoNegado";

// Protege rotas por perfil. Sem usuário: respeita AUTH_ATIVA (em demo, libera).
// Com usuário de outro perfil: mostra 403.
export default function RequireRole({ role, children }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    if (!AUTH_ATIVA) return children;
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (usuario.perfil !== role) {
    return <AcessoNegado />;
  }
  return children;
}
