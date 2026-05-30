import "./RelatorioPdf.css";

// Botao que abre a impressao do navegador (Salvar como PDF) ja com o CSS
// de impressao isolando apenas o relatorio do municipio. Funciona offline,
// sem dependencias extras.
export default function RelatorioPdf() {
  return (
    <button type="button" className="relatorio-btn" onClick={() => window.print()}>
      <span aria-hidden="true">🖨️</span> Exportar relatório (PDF)
    </button>
  );
}
