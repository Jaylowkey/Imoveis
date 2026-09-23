"use client";
import { useState } from "react";

export default function PublicarPage() {
  const [sent,setSent]=useState(false);
  if(sent) return <main className="form-page"><div className="form-card success"><div className="success-icon">✓</div><h1>Imóvel recebido</h1><p className="muted">O anúncio foi preparado para revisão. Na próxima fase, vamos ligar este formulário à conta do anunciante e à base de dados.</p><button className="btn btn-primary" onClick={()=>setSent(false)}>Publicar outro imóvel</button></div></main>;
  return <main className="form-page"><div className="form-card"><div className="eyebrow dark">Para proprietários e agentes</div><h1>Publicar imóvel</h1><p className="muted">Preencha os dados principais do imóvel. A publicação definitiva ficará sujeita à verificação.</p>
    <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="publish-form">
      <label>Título do anúncio<input required placeholder="Ex.: Moradia T4 moderna em Maputo" /></label>
      <div className="two"><label>Finalidade<select required><option>Venda</option><option>Arrendamento</option></select></label><label>Tipo<select required><option>Casa</option><option>Apartamento</option><option>Terreno</option><option>Comercial</option></select></label></div>
      <div className="two"><label>Preço (MT)<input required type="number" min="0" placeholder="0" /></label><label>Área (m²)<input required type="number" min="1" placeholder="0" /></label></div>
      <div className="two"><label>Cidade<input required placeholder="Maputo" /></label><label>Localização<input required placeholder="Polana, Maputo" /></label></div>
      <label>Descrição<textarea required rows={5} placeholder="Descreva o imóvel, localização e condições..." /></label><label>Contacto do anunciante<input required placeholder="+258 8x xxx xxxx" /></label>
      <button className="btn btn-primary submit" type="submit">Enviar anúncio para revisão</button>
    </form></div></main>;
}
