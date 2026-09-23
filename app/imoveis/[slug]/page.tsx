import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, properties } from "@/lib/properties";

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  return <main className="detail-page"><div className="container"><Link className="backlink" href="/imoveis">← Voltar aos imóveis</Link><div className="detail-grid">
    <div><div className="detail-image" style={{backgroundImage:"url(" + property.image + ")"}} /></div>
    <article className="detail-panel"><span className="detail-badge">{property.purpose}</span><div className="price detail-price">{formatPrice(property.price, property.purpose)}</div><h1>{property.title}</h1><p className="muted">📍 {property.location}</p>
      <div className="detail-stats"><b>{property.area} m²</b>{property.bedrooms && <b>{property.bedrooms} quartos</b>}{property.bathrooms && <b>{property.bathrooms} WC</b>}</div>
      <p className="detail-description">{property.description}</p><h3>Características</h3><div className="features">{property.features.map(f=><span key={f}>{f}</span>)}</div>
      <div className="contact-box"><b>Interessado neste imóvel?</b><p className="muted">Entre em contacto com o anunciante para pedir mais informações ou marcar uma visita.</p><button className="btn btn-primary">Contactar anunciante</button><button className="btn btn-outline">Agendar visita</button></div>
    </article></div></div></main>;
}
