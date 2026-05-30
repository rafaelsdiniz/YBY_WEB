import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route
          path="/municipios"
          element={
            <PlaceholderPage
              titulo="Municípios"
              descricao="Lista completa dos 139 municípios do Tocantins"
            />
          }
        />
        <Route
          path="/relatorios"
          element={
            <PlaceholderPage
              titulo="Relatórios"
              descricao="Relatórios consolidados de investimento e conformidade"
            />
          }
        />
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
