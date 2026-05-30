import "./Loader.css";

// Loader com o tucano: flutua sobre um fundo azul, com anel girando e
// sombra pulsando. `tela` deixa em tela cheia (splash).
export default function Loader({ texto = "Carregando...", tela = false }) {
  return (
    <div className={tela ? "loader loader--tela" : "loader"}>
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
