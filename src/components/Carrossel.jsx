import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Carrossel.css";

export default function Carrossel({ slides, intervalo = 5500 }) {
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (pausado || total <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % total), intervalo);
    return () => clearInterval(t);
  }, [pausado, total, intervalo]);

  const ir = (n) => setI((n + total) % total);

  return (
    <div
      className="carrossel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="carrossel-palco">
        {slides.map((s, idx) => (
          <figure
            key={s.img}
            className={`carrossel-slide ${idx === i ? "ativo" : ""}`}
            aria-hidden={idx !== i}
          >
            <img src={s.img} alt={s.titulo} loading={idx === 0 ? "eager" : "lazy"} />
            <figcaption>
              <span className="carrossel-tag">{s.tag}</span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </figcaption>
          </figure>
        ))}

        <button
          type="button"
          className="carrossel-seta esq"
          onClick={() => ir(i - 1)}
          aria-label="Anterior"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="carrossel-seta dir"
          onClick={() => ir(i + 1)}
          aria-label="Próximo"
        >
          <ChevronRight size={22} strokeWidth={1.75} />
        </button>
      </div>

      <div className="carrossel-dots">
        {slides.map((s, idx) => (
          <button
            type="button"
            key={s.img}
            className={idx === i ? "ativo" : ""}
            onClick={() => setI(idx)}
            aria-label={`Ir para o slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
