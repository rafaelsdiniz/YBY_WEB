import { useEffect, useState } from "react";
import { getMunicipios } from "./services/api";
import "./App.css";

export default function App() {
  const [municipios, setMunicipios] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p className="estado">Carregando dados do Tocantins...</p>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>YBY — JREDD+ Intelligence</h1>
        <p>Onde investir no Tocantins</p>
      </header>

      <div className="app-grid">
        <main className="card">
          {/* Mapa entra aqui (próxima funcionalidade) */}
          <p className="estado">Mapa do Tocantins em construção…</p>
        </main>
        <aside className="card">
          {/* Ranking + detalhe entram aqui */}
          <ul className="lista-temp">
            {municipios.map((m) => (
              <li key={m.id}>
                <span>{m.nome}</span>
                <strong>{m.prioridade}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
