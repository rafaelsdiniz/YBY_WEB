import { useEffect, useState } from "react";
import { Plus, FileText, MessageSquare, Pencil } from "lucide-react";
import { getFormularios } from "../services/formularios";
import "./AdminTabela.css";
import "./FormulariosPage.css";

const dataBR = (iso) => new Date(iso).toLocaleDateString("pt-BR");

export default function FormulariosPage() {
  const [formularios, setFormularios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getFormularios()
      .then(setFormularios)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Formulários</h1>
          <p>Modelos de coleta de dados (exclusivo do administrador)</p>
        </div>
        <button type="button" className="admin-novo">
          <Plus size={18} /> Novo formulário
        </button>
      </header>

      {carregando ? (
        <p className="estado">Carregando formulários...</p>
      ) : (
        <div className="form-grid">
          {formularios.map((f) => (
            <article key={f.id} className="card form-card">
              <div className="form-card-topo">
                <span className="form-icone">
                  <FileText size={20} strokeWidth={1.8} />
                </span>
                <span
                  className={`tag ${f.status === "PUBLICADO" ? "tag--verde" : "tag--amarelo"}`}
                >
                  {f.status === "PUBLICADO" ? "Publicado" : "Rascunho"}
                </span>
              </div>

              <h2 className="form-titulo">{f.titulo}</h2>

              <div className="form-meta">
                <span>
                  <MessageSquare size={15} /> {f.respostas} resposta(s)
                </span>
                <span>Atualizado em {dataBR(f.atualizado)}</span>
              </div>

              <div className="form-acoes">
                <button type="button" className="admin-acao">
                  <Pencil size={14} /> Editar
                </button>
                <button type="button" className="admin-acao">
                  Ver respostas
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
