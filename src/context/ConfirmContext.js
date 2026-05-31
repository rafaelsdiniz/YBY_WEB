import { createContext, useContext } from "react";

export const ConfirmContext = createContext(null);

// Retorna a função confirmar({titulo, mensagem, ...}) => Promise<boolean>.
export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm deve ser usado dentro de <ConfirmProvider>");
  return ctx;
}
