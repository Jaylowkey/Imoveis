import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage(){
 const user=await getCurrentUser(); if(!user) redirect("/auth");
 const [total,pending,published,contacts,properties]=await Promise.all([
  prisma.property.count({where:{ownerId:user.id}}),
  prisma.property.count({where:{ownerId:user.id,status:"PENDING"}}),
  prisma.property.count({where:{ownerId:user.id,status:"PUBLISHED"}}),
  prisma.inquiry.count({where:{property:{ownerId:user.id}}}),
  prisma.property.findMany({where:{ownerId:user.id},orderBy:{createdAt:"desc"},take:20})
 ]);
 return <main className="dashboard-page"><div className="container">
  <div className="dashboard-header"><div><div className="eyebrow dark">Área do anunciante</div><h1>Olá, {user.name||"utilizador"}</h1><p className="muted">Gira os seus imóveis, contactos e visitas num só lugar.</p></div><Link className="btn btn-primary" href="/publicar">+ Publicar imóvel</Link></div>
  <div className="stats-grid"><div className="stat-card"><span>Imóveis</span><strong>{total}</strong></div><div className="stat-card"><span>Pendentes</span><strong>{pending}</strong></div><div className="stat-card"><span>Publicados</span><strong>{published}</strong></div><div className="stat-card"><span>Contactos</span><strong>{contacts}</strong></div></div>
  <section className="dashboard-card"><div className="section-head"><div><h2>Os meus imóveis</h2><p className="muted">Estado atual dos seus anúncios.</p></div></div>
  {properties.length===0?<div className="dashboard-empty"><h3>Ainda não publicou nenhum imóvel</h3><p className="muted">Publique o seu primeiro anúncio e envie-o para revisão.</p><Link className="btn btn-primary" href="/publicar">Publicar primeiro imóvel</Link></div>:
  <div className="property-list">{properties.map(p=><div className="property-row" key={p.id}><div><h3>{p.title}</h3><p className="muted">{p.location}, {p.city} · {Number(p.price).toLocaleString("pt-MZ")} MT</p></div><span className={"status-badge status-"+p.status.toLowerCase()}>{p.status==="PUBLISHED"?"Publicado":p.status==="PENDING"?"Pendente":p.status==="REJECTED"?"Rejeitado":"Arquivado"}</span></div>)}</div>}
  </section>
 </div></main>;
}