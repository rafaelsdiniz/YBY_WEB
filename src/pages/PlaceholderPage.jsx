// Pagina generica para rotas ainda nao implementadas (mantem a navegacao
// institucional consistente sem 404).
export default function PlaceholderPage({ titulo, descricao }) {
  return (
    <>
      <header className="page-header">
        <h1>{titulo}</h1>
        {descricao && <p>{descricao}</p>}
      </header>
      <div className="card">
        <p className="estado">Em construção — disponível em breve.</p>
      </div>
    </>
  );
}
