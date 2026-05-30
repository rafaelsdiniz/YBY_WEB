import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

// Revela o elemento com fade+slide quando ele entra na viewport.
// Use `as` para virar o próprio elemento (ex.: as="article" num grid).
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visivel ? "reveal--on" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
