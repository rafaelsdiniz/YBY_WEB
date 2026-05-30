import { useEffect, useState } from "react";
import { Plus, FileText, MessageSquare, Pencil } from "lucide-react";
import { getFormularios } from "../services/formularios";
import { useToast } from "../context/ToastContext";
import "./AdminTabela.css";
import "./FormulariosPage.css";

const dataBR = (iso) => new Date(iso).toLocaleDateString("pt-BR");

export default function FormulariosPage() {
  const toast = useToast();
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
        <button
          type="button"
          className="admin-novo"
          onClick={() => toast.info("Criação de formulário disponível em breve.")}
        >
          <Plus size={17} strokeWidth={1.75} /> Novo formulário
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
                  <FileText size={22} strokeWidth={1.5} />
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
                  <MessageSquare size={14} strokeWidth={1.75} /> {f.respostas} resposta(s)
                </span>
                <span>Atualizado em {dataBR(f.atualizado)}</span>
              </div>

              <div className="form-acoes">
                <button
                  type="button"
                  className="admin-acao"
                  onClick={() => toast.info(`Editar "${f.titulo}" — em breve.`)}
                >
                  <Pencil size={14} strokeWidth={1.75} /> Editar
                </button>
                <button
                  type="button"
                  className="admin-acao"
                  onClick={() => toast.info(`${f.respostas} resposta(s) — visualização em breve.`)}
                >
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
