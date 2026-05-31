import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="rodape">
      <div className="rodape-topo">
        <div className="rodape-marca">
          <img src="/logoYBY.png" alt="YBY" className="rodape-logo-img" />
          <p className="rodape-tagline">
            Inteligência de monitoramento para investimento ambiental no Tocantins.
            Programa JREDD+.
          </p>
          <div className="rodape-iniciativa">
            <span className="rodape-iniciativa-label">Uma iniciativa de</span>
            <div className="rodape-oficiais">
              <img src="/governotocantins.webp" alt="Governo do Tocantins" />
              <img
                src="/secretaria.png"
                alt="Secretaria do Meio Ambiente e Recursos Hídricos"
              />
            </div>
          </div>
        </div>

        <nav className="rodape-col">
          <h4>Navegação</h4>
          <a href="#sobre">Sobre</a>
          <a href="#natureza">Natureza</a>
          <a href="#impactos">Impactos</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>

        <nav className="rodape-col">
          <h4>Plataforma</h4>
          <Link to="/painel">Painel</Link>
          <Link to="/municipios">Municípios</Link>
          <Link to="/relatorios">Relatórios</Link>
          <Link to="/login">Entrar</Link>
        </nav>

        <div className="rodape-col">
          <h4>Institucional</h4>
          <p>Governo do Estado do Tocantins</p>
          <p>Secretaria do Meio Ambiente e Recursos Hídricos</p>
          <p>Programa JREDD+ Intelligence</p>
        </div>
      </div>

      <div className="rodape-base">
        <div className="rodape-base-inner">
          <span>© {ano} YBY · Gestão Ambiental — Estado do Tocantins</span>
          <span>Feito para o Tocantins.</span>
        </div>
      </div>

      <div className="rodape-faixa" aria-hidden="true" />
    </footer>
  );
}
