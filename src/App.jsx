import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import DashboardPage from "./pages/DashboardPage";
import MunicipiosPage from "./pages/MunicipiosPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* rotas internas protegidas */}
        <Route
          index
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

      {/* login fica fora do layout: tela cheia, sem navbar */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
