import { X } from "lucide-react";
import "./Modal.css";

// Modal genérico (overlay + card com título e fechar).
export default function Modal({ titulo, onFechar, children }) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <h2>{titulo}</h2>
          <button type="button" onClick={onFechar} aria-label="Fechar">
            <X size={18} />
          </button>
        </header>
        <div className="modal-corpo">{children}</div>
      </div>
    </div>
  );
}
