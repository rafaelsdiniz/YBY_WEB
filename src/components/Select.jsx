import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import "./Select.css";

// Dropdown customizado e acessível, em substituição ao <select> nativo (cuja
// lista aberta o navegador desenha sem permitir CSS). A lista é renderizada em
// portal com posição fixa, então funciona dentro de modais (overflow:hidden)
// e toolbars sem ser cortada.
//
// options: [{ value, label }]   onChange(value)
export default function Select({
  value,
  onChange,
  options,
  placeholder = "Selecione…",
  id,
  disabled = false,
}) {
  const autoId = useId();
  const trigRef = useRef(null);
  const listRef = useRef(null);
  const [aberto, setAberto] = useState(false);
  const [coords, setCoords] = useState(null);
  const [ativo, setAtivo] = useState(-1);

  const idxSel = options.findIndex((o) => String(o.value) === String(value));
  const selecionada = idxSel >= 0 ? options[idxSel] : null;

  function posicionar() {
    const el = trigRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ left: r.left, top: r.bottom + 6, width: r.width });
  }

  function abrir() {
    if (disabled) return;
    posicionar();
    setAtivo(idxSel >= 0 ? idxSel : 0);
    setAberto(true);
  }

  function fechar(devolverFoco = true) {
    setAberto(false);
    if (devolverFoco) trigRef.current?.focus();
  }

  // reposiciona enquanto aberto (scroll/resize) e fecha ao clicar fora
  useLayoutEffect(() => {
    if (!aberto) return;
    posicionar();
    const reposicionar = () => posicionar();
    window.addEventListener("scroll", reposicionar, true);
    window.addEventListener("resize", reposicionar);
    return () => {
      window.removeEventListener("scroll", reposicionar, true);
      window.removeEventListener("resize", reposicionar);
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const aoApontar = (e) => {
      if (trigRef.current?.contains(e.target) || listRef.current?.contains(e.target)) return;
      setAberto(false);
    };
    document.addEventListener("pointerdown", aoApontar);
    return () => document.removeEventListener("pointerdown", aoApontar);
  }, [aberto]);

  function escolher(o) {
    onChange(o.value);
    fechar();
  }

  function aoTeclar(e) {
    if (!aberto) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      fechar();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setAtivo((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (options[ativo]) escolher(options[ativo]);
    }
  }

  return (
    <>
      <button
        type="button"
        id={id ?? autoId}
        ref={trigRef}
        className={`sel-trigger${aberto ? " aberto" : ""}`}
        onClick={() => (aberto ? fechar(false) : abrir())}
        onKeyDown={aoTeclar}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={aberto}
      >
        <span className={`sel-valor${selecionada ? "" : " sel-placeholder"}`}>
          {selecionada ? selecionada.label : placeholder}
        </span>
        <ChevronDown size={16} className="sel-seta" aria-hidden="true" />
      </button>

      {aberto &&
        coords &&
        createPortal(
          <ul
            ref={listRef}
            className="sel-lista"
            role="listbox"
            style={{ left: coords.left, top: coords.top, width: coords.width }}
          >
            {options.map((o, i) => {
              const sel = String(o.value) === String(value);
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={sel}
                  className={`sel-opcao${i === ativo ? " ativa" : ""}${sel ? " sel" : ""}`}
                  onMouseEnter={() => setAtivo(i)}
                  onClick={() => escolher(o)}
                >
                  <span>{o.label}</span>
                  {sel && <Check size={15} aria-hidden="true" />}
                </li>
              );
            })}
          </ul>,
          document.body
        )}
    </>
  );
}
