import Link from "next/link";

export default function DashboardPage() {
  return <main className="dashboard-page"><div className="container">
    <div className="dashboard-header"><div><div className="eyebrow dark">Área do anunciante</div><h1>Meu painel</h1><p className="muted">Gira os seus imóveis, contactos e visitas num só lugar.</p></div><Link className="btn btn-primary" href="/publicar">+ Publicar imóvel</Link></div>
    <div className="stats-grid"><div className="stat-card"><span>Imóveis</span><strong>0</strong></div><div className="stat-card"><span>Pendentes</span><strong>0</strong></div><div className="stat-card"><span>Publicados</span><strong>0</strong></div><div className="stat-card"><span>Contactos</span><strong>0</strong></div></div>
    <section className="dashboard-card"><div className="section-head"><div><h2>Os meus imóveis</h2><p className="muted">Os anúncios submetidos aparecerão aqui.</p></div></div><div className="dashboard-empty"><h3>Ainda não publicou nenhum imóvel</h3><p className="muted">Publique o seu primeiro anúncio e envie-o para revisão.</p><Link className="btn btn-primary" href="/publicar">Publicar primeiro imóvel</Link></div></section>
  </div></main>;
}
