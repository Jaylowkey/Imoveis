import Link from "next/link";
import { formatPrice, properties as samples } from "../../lib/properties";
import { prisma } from "../../lib/prisma";

export default async function ImoveisPage({ searchParams }: { searchParams: Promise<{ q?: string; purpose?: string; category?: string }> }) {
  const params = await searchParams;
  const q = (params.q || "").toLowerCase(); const purpose = params.purpose; const category = params.category;
  const live = await prisma.property.findMany({where:{status:"PUBLISHED"},orderBy:{createdAt:"desc"},take:100});
  const dbProperties = live.map(p=>({id:p.id,slug:p.slug,title:p.title,purpose:p.purpose==="SALE"?"Venda":"Arrendamento",category:p.category==="HOUSE"?"Casa":p.category==="APARTMENT"?"Apartamento":p.category==="LAND"?"Terreno":"Comercial",price:Number(p.price),location:p.location,city:p.city,area:p.area,bedrooms:p.bedrooms||undefined,bathrooms:p.bathrooms||undefined,description:p.description,features:p.features,image:p.image||"/placeholder-property.svg"}));
  const all=[...dbProperties,...samples];
  const filtered=all.filter(p=>(!q||[p.title,p.location,p.city,p.category].join(" ").toLowerCase().includes(q))&&(!purpose||p.purpose===purpose)&&(!category||p.category===category));
  return <main className="catalog-page"><div className="container">
    <div className="catalog-top"><div><div className="eyebrow dark">Marketplace imobiliário</div><h1>Imóveis em Moçambique</h1><p className="muted">{filtered.length} imóveis encontrados</p></div><Link className="btn btn-primary" href="/publicar">+ Publicar imóvel</Link></div>
    <form className="filters"><input name="q" defaultValue={params.q} placeholder="Pesquisar por localização ou tipo..." /><select name="purpose" defaultValue={purpose||""}><option value="">Comprar ou arrendar</option><option value="Venda">Comprar</option><option value="Arrendamento">Arrendar</option></select><select name="category" defaultValue={category||""}><option value="">Todos os tipos</option><option value="Casa">Casas</option><option value="Apartamento">Apartamentos</option><option value="Terreno">Terrenos</option><option value="Comercial">Comercial</option></select><button className="btn btn-primary">Pesquisar</button></form>
    <div className="catalog-grid">{filtered.map(p=><Link href={"/imoveis/"+p.slug} className="property-card" key={p.id}><div className="property-image" style={{backgroundImage:"url("+p.image+")"}}><span>{p.purpose}</span></div><div className="property-body"><div className="price">{formatPrice(p.price,p.purpose)}</div><h3>{p.title}</h3><div className="muted">📍 {p.location}</div><div className="property-meta">{p.bedrooms?p.bedrooms+" quartos · ":""}{p.bathrooms?p.bathrooms+" WC · ":""}{p.area} m²</div></div></Link>)}</div>
    {!filtered.length&&<div className="empty"><h2>Nenhum imóvel encontrado</h2><p className="muted">Tente alterar a localização, categoria ou finalidade.</p></div>}
  </div></main>;
}