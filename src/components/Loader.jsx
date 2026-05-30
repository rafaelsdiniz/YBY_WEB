import "./Loader.css";

// Splash do sistema: tucano + logo YBY + logo do Governo, sobre o verde da
// marca. `tela` = tela cheia; `fechando` = fade-out.
export default function Loader({ texto = "Carregando...", tela = false, fechando = false }) {
  const classe = ["loader", tela && "loader--tela", fechando && "loader--saindo"]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classe}>
      <div className="loader-conteudo">
        <div className="loader-tucano-wrap">
          <span className="loader-glow" aria-hidden="true" />
          <img src="/tucano.png" alt="" className="loader-tucano" />
        </div>

        <img src="/logoYBY.png" alt="YBY" className="loader-logo-yby" />

        <div className="loader-barra" aria-hidden="true">
          <span />
        </div>
        <p className="loader-texto">{texto}</p>

        <div className="loader-gov">
          <span className="loader-gov-label">Uma iniciativa do</span>
          <img
            src="/governotocantins.webp"
            alt="Governo do Tocantins"
            className="loader-logo-gov"
          />
        </div>
      </div>
    </div>
  );
}
