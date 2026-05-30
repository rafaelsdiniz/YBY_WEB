import "./Loader.css";

// Loader/splash do sistema: tucano flutuando sobre verde da marca, com glow
// suave e barra de progresso. `tela` = tela cheia; `fechando` = fade-out.
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
        <div className="loader-barra" aria-hidden="true">
          <span />
        </div>
        <p className="loader-texto">{texto}</p>
      </div>
    </div>
  );
}
