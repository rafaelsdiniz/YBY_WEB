import "./Loader.css";

// Loader com o tucano: flutua sobre um fundo azul, com anel girando e
// sombra pulsando. `tela` deixa em tela cheia (splash); `fechando` faz o
// fade-out antes de revelar o conteúdo.
export default function Loader({ texto = "Carregando...", tela = false, fechando = false }) {
  const classe = ["loader", tela && "loader--tela", fechando && "loader--saindo"]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classe}>
      <div className="loader-palco">
        <span className="loader-anel" aria-hidden="true" />
        <img src="/tucano.png" alt="" className="loader-tucano" />
        <span className="loader-sombra" aria-hidden="true" />
      </div>
      <p className="loader-texto">
        {texto}
        <span className="loader-dots" aria-hidden="true" />
      </p>
    </div>
  );
}
