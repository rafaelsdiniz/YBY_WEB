import "./Loader.css";

/**
 * Splash / loader centrado na marca YBY.
 * `tela`    = tela cheia (splash inicial, tema escuro).
 * `fechando` = fade-out de saída.
 */
export default function Loader({
  texto = "Carregando...",
  tela = false,
  fechando = false,
}) {
  const cls = ["loader", tela && "loader--tela", fechando && "loader--saindo"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {/* Partículas de fundo (só na tela cheia) */}
      {tela && (
        <div className="loader-particulas" aria-hidden="true">
          <span style={{ left: "12%",  animationDuration: "14s", animationDelay: "0s"  }} />
          <span style={{ left: "28%",  animationDuration: "20s", animationDelay: "4s"  }} />
          <span style={{ left: "47%",  animationDuration: "16s", animationDelay: "8s"  }} />
          <span style={{ left: "63%",  animationDuration: "12s", animationDelay: "2s"  }} />
          <span style={{ left: "79%",  animationDuration: "18s", animationDelay: "6s"  }} />
          <span style={{ left: "91%",  animationDuration: "22s", animationDelay: "1s"  }} />
        </div>
      )}

      <div className="loader-conteudo">
        {/* ── Marca YBY com anel giratório ── */}
        <div className="loader-marca">
          <span className="loader-anel" aria-hidden="true" />
          <span className="loader-halo" aria-hidden="true" />
          <img src="/logoYBY.png" alt="YBY" className="loader-logo" />
        </div>

        {/* Barra de progresso */}
        <div className="loader-barra" aria-hidden="true">
          <span />
        </div>
        <p className="loader-texto">{texto}</p>

        {/* Governo */}
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
