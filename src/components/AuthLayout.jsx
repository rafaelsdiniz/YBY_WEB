import { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

/*
  Partículas de carbono: pequenos pontos flutuantes que sobem pelo fundo,
  representando moléculas de CO₂ / ciclo do carbono do cerrado tocantinense.
*/
const PARTICULAS = [
  { left: "7%",  dur: "16s", delay: "0s"   },
  { left: "18%", dur: "22s", delay: "5s"   },
  { left: "32%", dur: "14s", delay: "11s"  },
  { left: "48%", dur: "19s", delay: "3s"   },
  { left: "61%", dur: "25s", delay: "8s"   },
  { left: "74%", dur: "13s", delay: "15s"  },
  { left: "87%", dur: "18s", delay: "2s"   },
  { left: "95%", dur: "21s", delay: "9s"   },
];

export default function AuthLayout({ children }) {
  const [formAtivo, setFormAtivo] = useState(false);

  return (
    <div className={`auth ${formAtivo ? "auth--form-ativo" : ""}`}>

      {/* ── Vídeo de fundo: Jalapão / Cerrado / Tocantins ── */}
      <video
        className="auth-video"
        src="/jalapao.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* ── Overlay verde escuro sobre o vídeo ── */}
      <div className="auth-overlay" aria-hidden="true" />

      {/* ── Partículas de carbono (CO₂ flutuando) ── */}
      <div className="auth-particulas" aria-hidden="true">
        {PARTICULAS.map((p, i) => (
          <span
            key={i}
            style={{
              left:              p.left,
              animationDuration: p.dur,
              animationDelay:    p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Barra superior ── */}
      <header className="auth-topbar">
        <Link to="/" className="auth-logo-link" title="YBY - página inicial">
          <img src="/logoYBY.png" alt="YBY" className="auth-logo" />
        </Link>
        <Link to="/" className="auth-voltar">← Voltar ao site</Link>
      </header>

      {/* ── Área central: tucano + card ── */}
      <main className="auth-main">

        {/* Tucano: absoluto, sobrepõe a borda esquerda do card */}
        <div className="auth-tucano" aria-hidden="true">
          <img src="/tucano.png" alt="" />
        </div>

        {/* Card glassmorphism */}
        <div
          className="auth-card"
          onMouseEnter={() => setFormAtivo(true)}
          onMouseLeave={() => setFormAtivo(false)}
        >
          {children}
        </div>

      </main>

      {/* ── Rodapé: logos governamentais ── */}
      <footer className="auth-rodape">
        <span className="auth-rodape-label">Uma iniciativa oficial de</span>
        <div className="auth-rodape-logos">
          <img src="/governotocantins.webp" alt="Governo do Tocantins" />
          <img src="/secretaria.png"        alt="Secretaria do Meio Ambiente e Recursos Hídricos" />
        </div>
      </footer>

    </div>
  );
}
