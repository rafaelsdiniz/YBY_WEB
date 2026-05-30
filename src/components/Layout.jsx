import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout institucional: navbar no topo, conteúdo da rota e footer no rodapé
// (footer fica colado embaixo mesmo em páginas curtas).
export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="app">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
