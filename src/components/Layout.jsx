import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Layout institucional: navbar fixa no topo + conteudo da rota.
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Outlet />
      </div>
    </>
  );
}
