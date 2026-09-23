import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, properties as samples } from "@/lib/properties";
import { prisma } from "@/lib/prisma";

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
 const {slug}=await params;
 const db=await prisma.property.findUnique({where:{slug},include:{owner:{select:{name:true,phone:true,email:true}}}});
 const sample=samples.find(p=>p.slug===slug);
 if(!db&&!sample) notFound();
 const p=db?{title:db.title,purpose:db.purpose==="SALE"?"Venda":"Arrendamento",price:Number(db.price),location:db.location,area:db.area,bedrooms:db.bedrooms,bathrooms:db.bathrooms,description:db.description,features:db.features,image:db.image||"/placeholder-property.svg",owner:db.owner}: {...sample!,owner:null};
 return <main className="detail-page"><div className="container"><Link className="backlink" href="/imoveis">← Voltar aos imóveis</Link><div className="detail-grid">
  <div><div className="detail-image" style={{backgroundImage:"url("+p.image+")"}} /></div>
  <article className="detail-panel"><span className="detail-badge">{p.purpose}</span><div className="price detail-price">{formatPrice(p.price,p.purpose)}</div><h1>{p.title}</h1><p className="muted">📍 {p.location}</p>
   <div className="detail-stats"><b>{p.area} m²</b>{p.bedrooms&&<b>{p.bedrooms} quartos</b>}{p.bathrooms&&<b>{p.bathrooms} WC</b>}</div>
   <p className="detail-description">{p.description}</p><h3>Características</h3><div className="features">{p.features.map(f=><span key={f}>{f}</span>)}</div>
   <div className="contact-box"><b>Interessado neste imóvel?</b><p className="muted">Entre em contacto com o anunciante para pedir mais informações ou marcar uma visita.</p>{p.owner?.phone&&<a className="btn btn-primary" href={"https://wa.me/"+p.owner.phone.replace(/\D/g,"")}>WhatsApp</a>}{p.owner?.email&&<a className="btn btn-outline" href={"mailto:"+p.owner.email}>Email</a>}</div>
  </article></div></div></main>;
}