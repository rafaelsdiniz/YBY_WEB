import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege rotas internas: sem usuario logado, redireciona para /login
// guardando de onde veio (para voltar apos o login).
export default function RequireAuth({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
