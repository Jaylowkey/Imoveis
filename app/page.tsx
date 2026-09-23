const properties = [
  { type: "Venda", price: "3.850.000 MT", title: "Moradia T4 moderna", location: "Sommerchield, Maputo", specs: "4 quartos · 3 WC · 420 m²" },
  { type: "Arrendamento", price: "75.000 MT / mês", title: "Apartamento T3 mobilado", location: "Polana, Maputo", specs: "3 quartos · 2 WC · 180 m²" },
  { type: "Terreno", price: "1.200.000 MT", title: "Terreno para construção", location: "Matola Rio, Maputo", specs: "1.000 m² · documentação" }
];

const categories = [
  ["🏠", "Casas", "Moradias e vivendas"],
  ["🏢", "Apartamentos", "T1 a T5"],
  ["🌳", "Terrenos", "Terrenos para construir"],
  ["🏪", "Comercial", "Lojas, escritórios e armazéns"]
];

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container nav">
          <a className="logo" href="/">Imó<span>veis</span></a>
          <nav className="navlinks">
            <a href="#imoveis">Comprar</a>
            <a href="#imoveis">Arrendar</a>
            <a href="#categorias">Terrenos</a>
            <a href="#sobre">Como funciona</a>
          </nav>
          <div className="actions">
            <button className="btn btn-outline">Entrar</button>
            <button className="btn btn-primary">Publicar imóvel</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Marketplace imobiliário de Moçambique</div>
              <h1>Encontre um lugar para chamar de seu.</h1>
              <p>Casas, apartamentos, terrenos e imóveis comerciais para comprar ou arrendar. Pesquise por localização, preço e características.</p>
            </div>

            <div className="searchbox">
              <div className="tabs">
                <button className="tab active">Comprar</button>
                <button className="tab">Arrendar</button>
                <button className="tab">Terrenos</button>
              </div>
              <div className="searchrow">
                <div className="field"><small>Localização</small><strong>Maputo, Moçambique</strong></div>
                <div className="field"><small>Tipo de imóvel</small><strong>Todos os tipos</strong></div>
                <div className="field"><small>Preço</small><strong>Qualquer preço</strong></div>
                <button className="searchbutton">Pesquisar</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="categorias">
          <div className="container">
            <div className="section-head">
              <div><h2>Procure por categoria</h2><div className="muted">Encontre exatamente o que procura.</div></div>
            </div>
            <div className="categories">
              {categories.map(([icon, name, desc]) => (
                <div className="category" key={name}><div style={{fontSize: 30, marginBottom: 12}}>{icon}</div><b>{name}</b><span className="muted">{desc}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="imoveis">
          <div className="container">
            <div className="section-head">
              <div><h2>Imóveis em destaque</h2><div className="muted">Uma prévia da nossa vitrine imobiliária.</div></div>
              <a className="btn btn-outline" href="#">Ver todos</a>
            </div>
            <div className="cards">
              {properties.map((property) => (
                <article className="card" key={property.title}>
                  <div className="photo"><span className="badge">{property.type}</span><button className="heart" aria-label="Adicionar aos favoritos">♡</button>Imagem do imóvel</div>
                  <div className="cardbody">
                    <div className="price">{property.price}</div>
                    <div className="title">{property.title}</div>
                    <div className="meta">📍 {property.location}</div>
                    <div className="specs"><span>{property.specs}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="sobre">
          <div className="container" style={{background:"#fff", border:"1px solid var(--border)", borderRadius:18, padding:"34px"}}>
            <h2 style={{marginTop:0}}>Uma plataforma para todo o mercado imobiliário</h2>
            <p className="muted" style={{maxWidth:760, lineHeight:1.7}}>O projeto será construído para conectar compradores, inquilinos, proprietários, agentes e imobiliárias. Na próxima fase entram contas, publicação de anúncios, favoritos, mensagens, visitas, mapa, verificação e gestão profissional.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footergrid">
          <div><h3>Imóveis</h3><p>Casas, terrenos e oportunidades imobiliárias em Moçambique.</p></div>
          <div><h3>Explorar</h3><p>Comprar<br/>Arrendar<br/>Terrenos<br/>Imóveis comerciais</p></div>
          <div><h3>Para anunciantes</h3><p>Publicar imóvel<br/>Criar conta profissional<br/>Gerir anúncios</p></div>
        </div>
      </footer>
    </>
  );
}