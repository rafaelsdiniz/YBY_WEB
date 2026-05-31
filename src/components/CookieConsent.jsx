import { useState } from "react";
import { Cookie } from "lucide-react";
import "./CookieConsent.css";

const CHAVE = "yby_cookies";

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(() => !localStorage.getItem(CHAVE));

  if (!visivel) return null;

  // "1" = aceito · "0" = recusado. Em ambos os casos não mostramos mais o aviso.
  function decidir(valor) {
    localStorage.setItem(CHAVE, valor);
    setVisivel(false);
  }

  return (
    <div className="cookie" role="dialog" aria-label="Aviso de cookies">
      <span className="cookie-icone">
        <Cookie size={20} strokeWidth={1.75} />
      </span>
      <p>
        Usamos cookies para melhorar sua experiência no YBY. Você pode aceitar ou
        recusar os cookies opcionais.
      </p>
      <div className="cookie-acoes">
        <button
          type="button"
          className="cookie-btn cookie-btn--recusar"
          onClick={() => decidir("0")}
        >
          Recusar
        </button>
        <button
          type="button"
          className="cookie-btn cookie-btn--aceitar"
          onClick={() => decidir("1")}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
