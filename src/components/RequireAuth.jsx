import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AUTH_ATIVA } from "../authConfig";

// Protege rotas internas: sem usuario logado, redireciona para /login
// guardando de onde veio (para voltar apos o login).
export default function RequireAuth({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();
  if (AUTH_ATIVA && !usuario) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
