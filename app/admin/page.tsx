import Link from "next/link";

export default function AdminPage() {
  return <main className="dashboard-page"><div className="container">
    <div className="dashboard-header"><div><div className="eyebrow dark">Gestão da plataforma</div><h1>Administração</h1><p className="muted">Modere anúncios e acompanhe a operação do marketplace.</p></div><Link className="btn btn-outline" href="/imoveis">Ver marketplace</Link></div>
    <div className="stats-grid"><div className="stat-card"><span>Anúncios pendentes</span><strong>0</strong></div><div className="stat-card"><span>Publicados</span><strong>0</strong></div><div className="stat-card"><span>Utilizadores</span><strong>0</strong></div><div className="stat-card"><span>Contactos</span><strong>0</strong></div></div>
    <section className="dashboard-card"><h2>Moderação</h2><div className="dashboard-empty"><h3>Nenhum anúncio pendente</h3><p className="muted">Quando um proprietário ou agente enviar um imóvel, ele aparecerá aqui para aprovação.</p></div></section>
  </div></main>;
}
