import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="rodape-marca">
          <div className="rodape-logo">
            <span className="rodape-logo-mark">Y</span>
            <strong>YBY</strong>
          </div>
          <p>
            Inteligência de priorização para investimento ambiental no Tocantins.
            Programa JREDD+.
          </p>
        </div>

        <nav className="rodape-links">
          <h4>Navegação</h4>
          <Link to="/painel">Painel</Link>
          <Link to="/municipios">Municípios</Link>
          <Link to="/relatorios">Relatórios</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>

        <div className="rodape-info">
          <h4>Institucional</h4>
          <p>Estado do Tocantins</p>
          <p>Programa JREDD+ Intelligence</p>
        </div>
      </div>

      <div className="rodape-institucional">
        <span className="rodape-init-txt">
          Uma iniciativa do <strong>Governo do Tocantins</strong> e da{" "}
          <strong>Secretaria do Meio Ambiente e Recursos Hídricos</strong>.
        </span>
        <div className="rodape-logos">
          <span className="rodape-logo-chip">
            <img src="/governotocantins.webp" alt="Governo do Tocantins" />
          </span>
          <span className="rodape-logo-chip">
            <img
              src="/secretaria.png"
              alt="Secretaria do Meio Ambiente e Recursos Hídricos"
            />
          </span>
        </div>
      </div>

      <div className="rodape-base">
        <span>© {ano} YBY · JREDD+ Intelligence — Tocantins</span>
      </div>

      <div className="rodape-faixa" aria-hidden="true" />
    </footer>
  );
}
