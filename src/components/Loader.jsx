import "./Loader.css";

// Splash/loader claro: logo YBY com pulso, barra de progresso verde e
// atribuição ao Governo do Tocantins. `tela` = tela cheia; `fechando` = fade.
export default function Loader({ texto = "Carregando...", tela = false, fechando = false }) {
  const classe = ["loader", tela && "loader--tela", fechando && "loader--saindo"]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classe}>
      <div className="loader-conteudo">
        <img src="/logoYBY.png" alt="YBY" className="loader-logo" />

        <div className="loader-barra" aria-hidden="true">
          <span />
        </div>
        <p className="loader-texto">{texto}</p>

        <div className="loader-gov">
          <span className="loader-gov-label">Uma iniciativa do Governo do Tocantins</span>
          <img
            src="/governotocantins.webp"
            alt="Governo do Tocantins"
            className="loader-gov-logo"
          />
        </div>
      </div>
    </div>
  );
}
