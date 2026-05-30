import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Liga/desliga a exigência de login. Deixe false para navegar livremente
// pelo sistema (demo); volte para true para proteger as rotas internas.
const AUTH_ATIVA = false;

// Protege rotas internas: sem usuario logado, redireciona para /login
// guardando de onde veio (para voltar apos o login).
export default function RequireAuth({ children }) {
  const { usuario } = useAuth();
  const location = useLocation();
  if (AUTH_ATIVA && !usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
