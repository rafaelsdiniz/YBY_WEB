import { useState } from "react";
import { Cookie } from "lucide-react";
import "./CookieConsent.css";

const CHAVE = "yby_cookies";

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(() => !localStorage.getItem(CHAVE));

  if (!visivel) return null;

  function aceitar() {
    localStorage.setItem(CHAVE, "1");
    setVisivel(false);
  }

  return (
    <div className="cookie" role="dialog" aria-label="Aviso de cookies">
      <span className="cookie-icone">
        <Cookie size={22} />
      </span>
      <p>
        Usamos cookies para melhorar sua experiência no YBY. Ao continuar
        navegando, você concorda com nossa política de privacidade.
      </p>
      <button type="button" onClick={aceitar}>
        Aceitar
      </button>
    </div>
  );
}
