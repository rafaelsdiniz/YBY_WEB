import React from "react";

/**
 * Ícone animado hambúrguer → X (adaptado de shadcn/ui para React + CSS puro).
 * Props:
 *   open     {boolean} - estado aberto/fechado
 *   size     {number}  - tamanho em px (default 24)
 *   color    {string}  - cor do stroke (default "currentColor")
 *   duration {number}  - duração da animação em ms (default 500)
 */
export function MenuToggleIcon({
  open,
  size = 24,
  color = "currentColor",
  strokeWidth = 2.5,
  duration = 500,
  style = {},
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        display: "block",
        ...style,
      }}
      {...props}
    >
      {/* S-path que some quando aberto */}
      <path
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        style={{
          strokeDasharray: open ? "20 300" : "12 63",
          strokeDashoffset: open ? "-32.42px" : "0px",
          transition: `stroke-dasharray ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
                       stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
      {/* Linha do meio — sempre presente */}
      <path d="M7 16 27 16" />
    </svg>
  );
}

export default MenuToggleIcon;
