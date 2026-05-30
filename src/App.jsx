import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import DashboardPage from "./pages/DashboardPage";
import MunicipiosPage from "./pages/MunicipiosPage";
import MinhaContaPage from "./pages/MinhaContaPage";
import UsuariosPage from "./pages/UsuariosPage";
import FormulariosPage from "./pages/FormulariosPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import SobrePage from "./pages/SobrePage";
import LoginPage from "./pages/LoginPage";
import EsqueciSenhaPage from "./pages/EsqueciSenhaPage";
import RedefinirSenhaPage from "./pages/RedefinirSenhaPage";
import LandingPage from "./pages/LandingPage";
import NaoEncontradaPage from "./pages/NaoEncontradaPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* site institucional na raiz */}
      <Route index element={<LandingPage />} />
      {/* autenticação: tela cheia, sem navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
      <Route path="/redefinir-senha" element={<RedefinirSenhaPage />} />

      <Route element={<Layout />}>
        {/* rotas internas protegidas */}
        <Route
          path="/painel"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/municipios"
          element={
            <RequireAuth>
              <MunicipiosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/relatorios"
          element={
            <RequireAuth>
              <RelatoriosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/minha-conta"
          element={
            <RequireAuth>
              <MinhaContaPage />
            </RequireAuth>
          }
        />

        {/* pública */}
        <Route path="/sobre" element={<SobrePage />} />

        {/* exclusivas do administrador */}
        <Route
          path="/usuarios"
          element={
            <RequireRole role="ADMIN">
              <UsuariosPage />
            </RequireRole>
          }
        />
        <Route
          path="/formularios"
          element={
            <RequireRole role="ADMIN">
              <FormulariosPage />
            </RequireRole>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NaoEncontradaPage />} />
    </Routes>
  );
}
