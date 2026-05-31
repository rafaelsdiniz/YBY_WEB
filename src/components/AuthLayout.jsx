import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

// ── GLSL Shaders ──────────────────────────────────────────────────────────────
const VERT_SRC = `
  attribute vec4 a_position;
  void main() { gl_Position = a_position; }
`;

const FRAG_SRC = `
precision mediump float;
uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;
uniform vec3  u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 centeredUV = (2.0 * fragCoord - iResolution.xy)
                    / min(iResolution.x, iResolution.y);
  float time = iTime * 0.5;

  vec2 mouse       = iMouse / iResolution;
  vec2 ripple      = 2.0 * mouse - 1.0;
  vec2 distortion  = centeredUV;

  for (float i = 1.0; i < 8.0; i++) {
    distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + ripple.x * 3.1415);
    distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + ripple.y * 3.1415);
  }

  float wave = abs(sin(distortion.x + distortion.y + time));
  float glow = smoothstep(0.9, 0.2, wave);
  fragColor  = vec4(u_color * glow, 1.0);
}

void main() { mainImage(gl_FragColor, gl_FragCoord.xy); }
`;

// ── SmokeyCanvas: fundo WebGL interativo ──────────────────────────────────────
function SmokeyCanvas() {
  const canvasRef = useRef(null);
  // useRef para o estado do mouse evita stale closure no loop de animação
  const mouseRef = useRef({ x: 0, y: 0, hover: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Shader error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "iResolution");
    const uTime  = gl.getUniformLocation(prog, "iTime");
    const uMouse = gl.getUniformLocation(prog, "iMouse");
    const uColor = gl.getUniformLocation(prog, "u_color");

    // Verde vibrante #22c55e = rgb(0.133, 0.773, 0.369)
    gl.uniform3f(uColor, 0.133, 0.773, 0.369);

    const start = Date.now();
    let rafId;

    const loop = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      const t = (Date.now() - start) / 1000;
      const { x, y, hover } = mouseRef.current;
      gl.uniform2f(uRes,   w, h);
      gl.uniform1f(uTime,  t);
      gl.uniform2f(uMouse, hover ? x : w / 2, hover ? h - y : h / 2);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(loop);
    };

    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
    };
    const onEnter = () => { mouseRef.current.hover = true;  };
    const onLeave = () => { mouseRef.current.hover = false; };

    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="auth-canvas" aria-hidden="true" />;
}

// ── AuthLayout ────────────────────────────────────────────────────────────────
export default function AuthLayout({ children }) {
  const [formAtivo, setFormAtivo] = useState(false);

  return (
    <div className={`auth ${formAtivo ? "auth--form-ativo" : ""}`}>

      {/* Fundo WebGL animado */}
      <SmokeyCanvas />
      {/* Overlay escuro para legibilidade */}
      <div className="auth-overlay" aria-hidden="true" />

      {/* Barra superior */}
      <header className="auth-topbar">
        <Link to="/" className="auth-logo-link" title="YBY — página inicial">
          <img src="/logoYBY.png" alt="YBY" className="auth-logo" />
        </Link>
        <Link to="/" className="auth-voltar">
          ← Voltar ao site
        </Link>
      </header>

      {/* Área central: tucano + card */}
      <main className="auth-main">

        {/* Tucano: fica à esquerda, sobrepõe a borda do card */}
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

      {/* Rodapé com logos oficiais */}
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
