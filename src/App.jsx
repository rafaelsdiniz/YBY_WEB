import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import DashboardPage from "./pages/DashboardPage";
import MunicipiosPage from "./pages/MunicipiosPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* site institucional na raiz */}
      <Route index element={<LandingPage />} />
      {/* login: tela cheia, sem navbar; ao entrar vai para /painel */}
      <Route path="/login" element={<LoginPage />} />

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
              <PlaceholderPage
                titulo="Relatórios"
                descricao="Relatórios consolidados de investimento e conformidade"
              />
            </RequireAuth>
          }
        />
        {/* pública */}
        <Route
          path="/sobre"
          element={
            <PlaceholderPage
              titulo="Sobre o YBY"
              descricao="Inteligência de priorização para investimento ambiental (JREDD+)"
            />
          }
        />
      </Route>
    </Routes>
  );
}
