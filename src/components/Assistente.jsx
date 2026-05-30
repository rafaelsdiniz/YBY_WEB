import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { getMunicipios } from "../services/api";
import { perguntar } from "../services/assistente";
import "./Assistente.css";

const SUGESTOES = [
  "Onde investir primeiro?",
  "Quais estão em risco?",
  "Tem desperdício?",
];

const SAUDACAO = {
  de: "ia",
  texto:
    "Olá! Sou o assistente do YBY. Pergunte sobre prioridade, risco, desperdício ou conformidade dos municípios — ou cite um município pelo nome.",
};

export default function Assistente() {
  const [aberto, setAberto] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [mensagens, setMensagens] = useState([SAUDACAO]);
  const [entrada, setEntrada] = useState("");
  const [pensando, setPensando] = useState(false);
  const fimRef = useRef(null);

  useEffect(() => {
    getMunicipios().then(setMunicipios).catch(() => {});
  }, []);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, pensando, aberto]);

  async function enviar(texto) {
    const t = (texto ?? entrada).trim();
    if (!t || pensando) return;
    setMensagens((m) => [...m, { de: "user", texto: t }]);
    setEntrada("");
    setPensando(true);
    try {
      const r = await perguntar(t, municipios);
      setMensagens((m) => [...m, { de: "ia", texto: r }]);
    } catch (err) {
      setMensagens((m) => [...m, { de: "ia", texto: err.message }]);
    } finally {
      setPensando(false);
    }
  }

  function aoSubmeter(e) {
    e.preventDefault();
    enviar();
  }

  return (
    <>
      <button
        type="button"
        className={`chat-fab ${aberto ? "aberto" : ""}`}
        onClick={() => setAberto((a) => !a)}
        aria-label={aberto ? "Fechar assistente" : "Abrir assistente"}
      >
        {aberto ? <X size={20} strokeWidth={1.75} /> : <MessageSquare size={20} strokeWidth={1.75} />}
      </button>

      {aberto && (
        <section className="chat" role="dialog" aria-label="Assistente YBY">
          <header className="chat-head">
            <span className="chat-avatar">
              <img src="/tucano.png" alt="" />
            </span>
            <div className="chat-head-txt">
              <strong>Assistente YBY</strong>
              <small>Responde sobre os dados do Tocantins</small>
            </div>
          </header>

          <div className="chat-corpo">
            {mensagens.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.de}`}>
                {m.de === "ia" && (
                  <span className="chat-msg-avatar">
                    <img src="/tucano.png" alt="" />
                  </span>
                )}
                <p>{m.texto}</p>
              </div>
            ))}

            {pensando && (
              <div className="chat-msg chat-msg--ia">
                <span className="chat-msg-avatar">
                  <img src="/tucano.png" alt="" />
                </span>
                <p className="chat-digitando">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </div>
            )}

            {mensagens.length === 1 && !pensando && (
              <div className="chat-sugestoes">
                {SUGESTOES.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={fimRef} />
          </div>

          <form className="chat-input" onSubmit={aoSubmeter}>
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Pergunte algo..."
              aria-label="Sua pergunta"
            />
            <button type="submit" disabled={pensando || !entrada.trim()} aria-label="Enviar">
              <Send size={17} strokeWidth={1.75} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
