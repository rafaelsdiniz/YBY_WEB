import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// Shell do sistema (área de quem opera): sidebar fixa + conteúdo da rota.
export default function Layout() {
  return (
    <div className="shell">
      <Sidebar />
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}
