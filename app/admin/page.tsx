import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import AdminModeration from "./moderation";

export default async function AdminPage() {
  const user=await getCurrentUser();
  if(!user) redirect("/auth");
  if(user.role!=="ADMIN") redirect("/dashboard");
  const [pending,published,users,contacts]=await Promise.all([
    prisma.property.count({where:{status:"PENDING"}}),
    prisma.property.count({where:{status:"PUBLISHED"}}),
    prisma.user.count(),
    prisma.inquiry.count()
  ]);
  const items=await prisma.property.findMany({where:{status:"PENDING"},include:{owner:{select:{name:true,email:true,phone:true}}},orderBy:{createdAt:"asc"},take:50});
  return <main className="dashboard-page"><div className="container">
    <div className="dashboard-header"><div><div className="eyebrow dark">Gestão da plataforma</div><h1>Administração</h1><p className="muted">Modere anúncios e acompanhe a operação.</p></div><Link className="btn btn-outline" href="/imoveis">Ver marketplace</Link></div>
    <div className="stats-grid"><div className="stat-card"><span>Anúncios pendentes</span><strong>{pending}</strong></div><div className="stat-card"><span>Publicados</span><strong>{published}</strong></div><div className="stat-card"><span>Utilizadores</span><strong>{users}</strong></div><div className="stat-card"><span>Contactos</span><strong>{contacts}</strong></div></div>
    <section className="dashboard-card"><h2>Moderação</h2><AdminModeration items={items.map(p=>({id:p.id,title:p.title,city:p.city,location:p.location,price:p.price.toString(),createdAt:p.createdAt.toISOString(),owner:p.owner}))}/></section>
  </div></main>;
}